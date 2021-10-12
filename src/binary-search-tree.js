const { NotImplementedError } = require("../extensions/index.js");
const { Node } = require("../extensions/list-tree.js");

module.exports = class BinarySearchTree {
  constructor() {
    this._root = null;
  }
  root() {
    return this.isEmpty() ? null : this._root;
  }

  add(data) {
    const newNode = new Node(data);
    if (this.isEmpty()) {
      this._root = newNode;
      return this;
    }
    let current = this._root;
    while (current) {
      if (data === current.data) return undefined;
      if (data < current.data) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  has(data) {
    if (this.isEmpty()) return false;
    let current = this._root;
    let found = false;
    while (current && !found) {
      if (data < current.data) {
        current = current.left;
      } else if (data > current.data) {
        current = current.right;
      } else {
        found = true;
        break;
      }
    }
    return found;
  }

  find(data) {
    if (this.isEmpty()) return false;
    let current = this._root;
    let found = false;
    while (current && !found) {
      if (data < current.data) {
        current = current.left;
      } else if (data > current.data) {
        current = current.right;
      } else {
        found = current;
      }
    }
    if (!found) return null;
    return found;
  }

  remove(data) {
    deleteRec(this._root, data);
    function deleteRec(root, data) {
      if (root == null) return root;
      if (data < root.data) root.left = deleteRec(root.left, data);
      else if (data > root.data) root.right = deleteRec(root.right, data);
      else {
        if (root.left == null) return root.right;
        else if (root.right == null) return root.left;
        root.data = minValue(root.right);

        root.right = deleteRec(root.right, root.data);
      }
      return root;
    }

    function minValue(root) {
      let minv = root.data;
      while (root.left != null) {
        minv = root.left.data;
        root = root.left;
      }
      return minv;
    }
  }

  /// helper function to find the smallest node

  kthSmallestNode(node) {
    while (!node.left === null) node = node.left;

    return node;
  }

  min() {
    if (this.isEmpty()) return null;
    let current = this._root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    if (this.isEmpty()) return null;
    let current = this._root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }

  isEmpty() {
    return this._root === null;
  }
};
