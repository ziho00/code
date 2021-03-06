/**
 * leetcoed 206. 反转链表
 *
 *  反转链表
 *
 * @param head
 */
function reverseList(head: ListNode<number> | null): ListNode<number> | null {
  if (!head || !head.next) {
    return head;
  }
  let cur: null | ListNode<number> = head,
    pre: null | ListNode<number> = null;
  while (cur) {
    let next: null | ListNode<number> = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  return pre;
}

let list2: ListNode<number> = new ListNode<number>(1);
list2.next = new ListNode<number>(2);
list2.next.next = new ListNode<number>(3);
list2.next.next.next = new ListNode<number>(4);
list2.next.next.next.next = new ListNode<number>(5);
console.log(reverseList(list2));

/**
 * 剑指 Offer 22. 链表中倒数第k个节点
 *
 * @param head
 * @param k
 */
function getKthFromEnd(
  head: ListNode<number> | null,
  k: number
): ListNode<number> | null {
  if (!head) {
    return head;
  }
  let stack: ListNode<number>[] = [];
  let p: ListNode<number> | null = head;
  while (p) {
    stack.push(p);
    p = p.next;
  }
  return stack[stack.length - k];
}

// function getKthFromEnd(head: ListNode<number> | null, k: number): ListNode<number> | null {
//   if (!head) {
//     return head;
//   }
//   let stack: ListNode<number>[] = [];
//   let p: ListNode<number> | null = head;
//   while (p) {
//     stack.push(p);
//     p = p.next;
//   }
//   return stack[stack.length - k];
// }

/**
 * 21. 合并两个有序链表
 *
 * @param l1
 * @param l2
 */
function mergeTwoLists(
  l1: ListNode<number> | null,
  l2: ListNode<number> | null
): ListNode<number> | null {
  let vNode = new ListNode<number>(),
    res = vNode;
  while (l1 && l2) {
    if (Number(l1.val) > Number(l2.val)) {
      vNode.next = l2;
      l2 = l2.next;
    } else {
      vNode.next = l1;
      l1 = l1.next;
    }
    vNode = vNode.next;
  }
  while (l1) {
    vNode.next = l1;
    l1 = l1.next;
    vNode = vNode.next;
  }
  while (l2) {
    vNode.next = l2;
    l2 = l2.next;
    vNode = vNode.next;
  }
  return res.next;
}

/**
 *
 * @param head
 */
function swapPairs(head: ListNode<number> | null): ListNode<number> | null {
  let vNode: ListNode<number> | null = new ListNode<number>();
  vNode.next = head;
  let p = vNode;
  while (p.next && p.next.next) {
    const node1 = p.next;
    const node2 = p.next.next;
    p.next = node2;
    node1.next = node2.next;
    node2.next = node1;
    p = node1;
  }
  return vNode.next;
}

function rotate(nums: number[], k: number): void {
  if (nums.length >> 0 < 2) {
    return;
  }
  let len: number = nums.length >> 0;
  for (let i: number = 0; i < k; i++) {
    let temp = nums[len - 1];
    for (let j = len - 2; j >= 0; j++) {
      nums[j + 1] = nums[j];
    }
    nums[0] = temp;
  }
}

let nums: number[] = [1, 2, 3, 4, 5, 6, 7];
console.log(rotate(nums, 3));

function removeDuplicates(nums: number[]): number {
  if (nums.length >> 0 < 2) {
    return nums.length;
  }
  let counter: number = 1;
  for (let i: number = 1, l: number = nums.length; i < l; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[counter] = nums[i];
      counter++;
    }
  }
  return counter;
}

function trap(height: number[]): number {
  if (!height) {
    return 0;
  }
  let stack: number[] = [];
  let ans: number = 0;
  for (let i = 0, l = height.length >> 0; i < l; i++) {
    while (
      stack.length >> 0 > 0 &&
      height[i] > height[stack[stack.length - 1]]
    ) {
      let top: number = stack.pop()!;
      while (!stack.length && height[stack[stack.length - 1]] == height[top]) {
        stack.pop();
      }
      if (stack.length) {
        let last = stack[stack.length - 1]; // 左边界位置
        let distance: number = i - last - 1; // 宽度
        // height[i] 和 height[last] 分别是有边界与左边界的高度，取最小值 - height[top] 则为可接雨水的高度
        let curHeight: number = Math.min(height[i], height[last]) - height[top];
        ans += distance * curHeight;
      }
    }
    stack.push(i);
  }
  return ans;
}

var largestRectangleArea = function(heights: number[]) {
  if (!heights.length) {
    return 0;
  }
  let stack: number[] = [];
  let maxArea: number = 0;
  let i: number = 0;
  while (i < heights.length) {
    let len = stack.length - 1;
    if (stack.length == 0 || heights[i] >= heights[stack[len]]) {
      stack.push(i);
      i++;
      continue;
    }

    let top: number = stack.pop()!;
    len = stack.length - 1;
    let t = stack.length
      ? heights[top] * (i - stack[len] - 1)
      : heights[top] * i;
    if (t > maxArea) maxArea = t;
  }

  while (stack.length) {
    let top: number = stack.pop()!;
    let len: number = stack.length - 1;
    let t: number = stack.length
      ? heights[top] * (i - stack[len] - 1)
      : heights[top] * i;
    if (t > maxArea) maxArea = t;
  }

  return maxArea;
};
console.log(largestRectangleArea([2,1,5,6,2,3]))