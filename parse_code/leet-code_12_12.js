"use strict";
// 242. 有效的字母异位词 https://leetcode-cn.com/problems/valid-anagram/
function isAnagram(s, t) {
    if (s.length !== t.length) {
        return false;
    }
    var map = {};
    for (var i = 0, l = s.length; i < l; i++) {
        map[s.charAt(i)] = map[s.charAt(i)] ? map[s.charAt(i)] + 1 : 1;
    }
    for (var i = 0, l = t.length; i < l; i++) {
        if (!map[t.charAt(i)] || map[t.charAt(i)] <= 0) {
            return false;
        }
        map[t.charAt(i)]--;
    }
    return true;
}
// 236. 二叉树的最近公共祖先 https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
// function lowestCommonAncestor(
//   root: TreeNode | null,
//   p: TreeNode | null,
//   q: TreeNode | null
// ): TreeNode | null {
//   let ans: TreeNode | null;
//   const helper: Function = (node: TreeNode | null): boolean => {
//     if (!node) {
//       return false;
//     }
//     let left: boolean = helper(node.left, p, q);
//     let right: boolean = helper(node.right, p, q);
//     if (
//       (left && right) ||
//       ((left || right) && (node.val === p.val || node.val === q.val))
//     ) {
//       ans = node;
//     }
//     return left || right || node.val === p.val || node.val === q.val;
//   };
//   helper(root);
//   return ans;
// }
// 3. 无重复字符的最长子串  https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/
function lengthOfLongestSubstring(s) {
    var queue = [];
    var ans = 0;
    for (var i = 0, l = s.length; i < l; i++) {
        var idx = queue.indexOf(s.charAt(i));
        if (idx !== -1) {
            queue = queue.slice(idx + 1);
        }
        queue.push(s.charAt(i));
        if (queue.length > ans) {
            ans = queue.length;
        }
    }
    return ans;
}
function topKFrequent(words, k) {
    var ans = [];
    if (!words.length) {
        return ans;
    }
    var map = {};
    for (var i = 0, l = words.length; i < l; i++) {
        map[words[i]] = map[words[i]] ? map[words[i]] + 1 : 1;
    }
    Object.keys(map).map(function (key) {
        var insertIndex = ans.length - 1;
        while (insertIndex >= 0 && map[key] > map[ans[insertIndex]]) {
            ans[insertIndex + 1] = ans[insertIndex];
            insertIndex--;
        }
        ans[insertIndex + 1] = key;
    });
    console.log(ans.splice(0, k));
    return ans.splice(0, k);
}
topKFrequent(["i", "love", "leetcode", "i", "love", "coding"], 2);
topKFrequent(["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], 4);
