"use strict";
var TreeNode = /** @class */ (function () {
    function TreeNode(val, left, right) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
    return TreeNode;
}());
function serialize(root) {
    if (!root) {
        return "null";
    }
    var left = serialize(root.left);
    var right = serialize(root.right);
    return root.val + "," + left + "," + right;
}
var tree = new TreeNode(1);
tree.left = new TreeNode(2);
tree.right = new TreeNode(3);
tree.right.left = new TreeNode(4);
tree.right.right = new TreeNode(5);
serialize(tree);
function deserialize(data) {
    var list = data.split(",");
    var helper = function (list) {
        var val = list.shift();
        if (!val || val == "null") {
            return null;
        }
        var root = new TreeNode(val);
        root.left = helper(list);
        root.right = helper(list);
        return root;
    };
    return helper(list);
}
console.log(deserialize(serialize(tree)));
