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
    if (this.isEmpty()) {
      return this;
    }
    return removeNode(this._root, null);

    function removeNode(node, parent, leftOrRight) {
      if (node.data === data) {
        return actualRemoval(node, parent, leftOrRight);
      }
      if (data < node.data) {
        if (!node.left) {
          return;
        } else {
          return removeNode(node.left, node, "l");
        }
      } else {
        if (!node.right) {
          return;
        } else {
          return removeNode(node.right, node, "r");
        }
      }
    }
    function actualRemoval(node, parent, leftOrRight) {
      let tmp = Object.assign(node);
      if (!node.left && !node.right) {
        if (parent) {
          if (leftOrRight === "l") {
            parent.left = null;
          } else {
            parent.right = null;
          }
        } else {
          node = null;
        }
        return tmp;
      }
      if (!node.left) {
        if (parent) {
          if (leftOrRight === "l") {
            parent.left = node.right;
          } else {
            parent.right = node.right;
          }
        } else {
          node = node.right;
        }
        return tmp;
      }
      if (!node.right) {
        if (parent) {
          if (leftOrRight === "l") {
            parent.left = node.leftt;
          } else {
            parent.right = node.left;
          }
        } else {
          node = node.left;
        }
        return tmp;
      }
      node.data = popMin(node.right, node, "r").data;
      return tmp;
    }
    function popMin(node, parent, leftOrRight) {
      if (!node.left) {
        let tmp = Object.assign(node);
        if (leftOrRight == "l") {
          parent.left = node.right;
        } else {
          parent.right = node.right;
        }
        return tmp;
      }
      return popMin(node.left, node, "l");
    }
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
