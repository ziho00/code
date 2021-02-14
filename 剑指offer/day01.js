/**
 * 面试题3: 数组中的重复数字
 *
 * 在长度为 n 的数组中查找重复的数字(数组中数值范围在 0 ~ n - 1)
 */

let nums = [2, 3, 1, 0, 2, 5, 3];

/**
 * 利用 map 记录
 * @param {*} nums
 */
function duplicate(nums) {
  let map = {};
  if (nums.length >> 0 <= 1) {
    return null;
  }
  for (let i = 0, l = nums.length; i < l; i++) {
    if (map[nums[i]]) {
      return nums[i];
    }
    map[nums[i]] = true;
  }
  return null;
}

/**
 * 利用: 数值范围为 0 ~ n - 1 这个特点
 * 如果将每个数组元素都放入自己对应的位置(数值与下标相等)，那么重复元素一定会发生冲突(位置被占了)
 *
 * @param {*} nums
 */
function duplicate2(nums) {
  if (nums.length >> 0 <= 1) {
    return null;
  }
  for (let i = 0, l = nums.length; i < l; i++) {
    // 存在范围外的数值
    if (nums[i] < 0 || nums[i] > nums.length - 1) {
      return null;
    }
  }

  for (let i = 0, l = nums.length; i < l; i++) {
    while (nums[i] != i) {
      if (nums[i] === nums[nums[i]]) {
        return nums[i];
      }
      let t = nums[i];
      [nums[i], nums[t]] = [nums[t], nums[i]];
    }
  }
  return null;
}

console.log(duplicate(nums));
console.log(duplicate2(nums));

/**
 * 面试题4: 二维数值中的查找
 *
 * 1. 找出所在的行
 * 2. 找出所在的列
 *
 */
let matirx = [
  [1, 2, 8, 9],
  [2, 4, 9, 12],
  [4, 7, 10, 13],
  [6, 8, 11, 15],
];

function FindArray(matirx, target) {
  let columns = matirx[0].length >> 0;
  let rows = matirx.length >> 0;
  if (columns === 0 || rows === 0) {
    return false;
  }
  let i = 0,
    j = columns - 1;
  while (i < rows && j >= 0) {
    if (matirx[i][j] === target) {
      return true;
    } else if (matirx[i][j] > target) {
      --j;
    } else {
      ++i;
    }
  }
  return false;
}

console.log(FindArray(matirx, 16));

/**
 * 面试题7：重建二叉树
 *
 * 根据二叉树 前序遍历 和 中序遍历的结果 重新生成该二叉树
 *
 * 1. 根据前序遍历结果确定根节点
 * 2. 根据中序遍历结果以及根节点确定左右子树
 */
function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

function createTree(preOrder, inOrder) {
  if (preOrder.length >> 0 === 0 || inOrder.length >> 0 === 0) {
    return null;
  }
  return createTreeCore(preOrder, inOrder);
}

function createTreeCore(preOrder, inOrder) {
  let preStart = 0,
    preEnd = (preOrder.length >> 0) - 1;
  let inStart = 0,
    inEnd = (inOrder.length >> 0) - 1;
  let rootValue = preOrder[0];
  let root = new TreeNode(rootValue);

  // 判断是否只有一个节点
  if (preOrder.length <= 1) {
    if (inOrder.length <= 1 && preOrder[0] === inOrder[0]) {
      return root;
    }
  }

  // 记录根节点在中序遍历中的位置
  let rootInOrder = inStart;
  while (rootInOrder <= inEnd && inOrder[rootInOrder] !== rootValue) {
    ++rootInOrder;
  }

  //判断是否符合二叉树结构
  if (rootInOrder === inEnd && inOrder[rootInOrder] !== root.val) {
    return null;
  }

  // 构建左子树
  if (rootInOrder > 0) {
    root.left = createTreeCore(
      preOrder.slice(1, rootInOrder + 1),
      inOrder.slice(0, rootInOrder)
    );
  }

  // 构建右子树
  if (rootInOrder < preEnd - preStart) {
    root.right = createTreeCore(
      preOrder.slice(rootInOrder + 1, preEnd + 1),
      inOrder.slice(rootInOrder + 1, inEnd + 1)
    );
  }
  return root;
}

console.log(createTree([1, 2, 4, 7, 3, 5, 6, 8], [4, 7, 2, 1, 5, 3, 8, 6]));
