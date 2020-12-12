"use strict";
/**
 * leetcoed 206. 反转链表
 *
 *  反转链表
 *
 * @param head
 */
function reverseList(head) {
    if (!head || !head.next) {
        return head;
    }
    var cur = head, pre = null;
    while (cur) {
        var next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    return pre;
}
var list2 = new ListNode(1);
list2.next = new ListNode(2);
list2.next.next = new ListNode(3);
list2.next.next.next = new ListNode(4);
list2.next.next.next.next = new ListNode(5);
console.log(reverseList(list2));
/**
 * 剑指 Offer 22. 链表中倒数第k个节点
 *
 * @param head
 * @param k
 */
function getKthFromEnd(head, k) {
    if (!head) {
        return head;
    }
    var stack = [];
    var p = head;
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
function mergeTwoLists(l1, l2) {
    var vNode = new ListNode(), res = vNode;
    while (l1 && l2) {
        if (Number(l1.val) > Number(l2.val)) {
            vNode.next = l2;
            l2 = l2.next;
        }
        else {
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
function swapPairs(head) {
    var vNode = new ListNode();
    vNode.next = head;
    var p = vNode;
    while (p.next && p.next.next) {
        var node1 = p.next;
        var node2 = p.next.next;
        p.next = node2;
        node1.next = node2.next;
        node2.next = node1;
        p = node1;
    }
    return vNode.next;
}
function rotate(nums, k) {
    if (nums.length >> 0 < 2) {
        return;
    }
    var len = nums.length >> 0;
    for (var i = 0; i < k; i++) {
        var temp = nums[len - 1];
        for (var j = len - 2; j >= 0; j++) {
            nums[j + 1] = nums[j];
        }
        nums[0] = temp;
    }
}
var nums = [1, 2, 3, 4, 5, 6, 7];
console.log(rotate(nums, 3));
function removeDuplicates(nums) {
    if (nums.length >> 0 < 2) {
        return nums.length;
    }
    var counter = 1;
    for (var i = 1, l = nums.length; i < l; i++) {
        if (nums[i] !== nums[i - 1]) {
            nums[counter] = nums[i];
            counter++;
        }
    }
    return counter;
}
function trap(height) {
    if (!height) {
        return 0;
    }
    var stack = [];
    var ans = 0;
    for (var i = 0, l = height.length >> 0; i < l; i++) {
        while (stack.length >> 0 > 0 &&
            height[i] > height[stack[stack.length - 1]]) {
            var top_1 = stack.pop();
            while (!stack.length && height[stack[stack.length - 1]] == height[top_1]) {
                stack.pop();
            }
            if (stack.length) {
                var last = stack[stack.length - 1]; // 左边界位置
                var distance = i - last - 1; // 宽度
                // height[i] 和 height[last] 分别是有边界与左边界的高度，取最小值 - height[top] 则为可接雨水的高度
                var curHeight = Math.min(height[i], height[last]) - height[top_1];
                ans += distance * curHeight;
            }
        }
        stack.push(i);
    }
    return ans;
}
var largestRectangleArea = function (heights) {
    if (!heights.length) {
        return 0;
    }
    var stack = [];
    var maxArea = 0;
    var i = 0;
    while (i < heights.length) {
        var len = stack.length - 1;
        if (stack.length == 0 || heights[i] >= heights[stack[len]]) {
            stack.push(i);
            i++;
            continue;
        }
        var top_2 = stack.pop();
        len = stack.length - 1;
        var t = stack.length
            ? heights[top_2] * (i - stack[len] - 1)
            : heights[top_2] * i;
        if (t > maxArea)
            maxArea = t;
    }
    while (stack.length) {
        var top_3 = stack.pop();
        var len = stack.length - 1;
        var t = stack.length
            ? heights[top_3] * (i - stack[len] - 1)
            : heights[top_3] * i;
        if (t > maxArea)
            maxArea = t;
    }
    return maxArea;
};
console.log(largestRectangleArea([2, 1, 5, 6, 2, 3]));
