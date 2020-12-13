class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function serialize(root: TreeNode | null): string {
  if (!root) {
    return "null";
  }
  let left = serialize(root.left);
  let right = serialize(root.right);
  return root.val + "," + left + "," + right;
}

let tree = new TreeNode(1);
tree.left = new TreeNode(2);
tree.right = new TreeNode(3);
tree.right.left = new TreeNode(4);
tree.right.right = new TreeNode(5);

serialize(tree);

function deserialize(data: string): TreeNode | null {
  const list: any = data.split(",")!;

  const helper = (list: Array<TreeNode | null>) => {
    const val: any = list.shift();
    if (!val || val == "null") {
      return null;
    }
    const root = new TreeNode(val);
    root.left = helper(list);
    root.right = helper(list);
    return root;
  };

  return helper(list);
}

console.log(deserialize(serialize(tree)));
