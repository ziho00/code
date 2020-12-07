"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
/**
 * 冒泡排序
 *
 * 时间复杂度: O(n^2)
 * 空间复杂度: O(1)
 * 稳定的排序方法
 * 原地排序算法
 *
 * 原理: 每次遍历找最大的值，并通过不断交换位置把最大的值移动到数组末端，就像水泡往上冒一样。
 *
 * @param arr
 * @param compare
 */
function bubbleSort(arr, compare) {
    var _a;
    for (var i = 0, l = arr.length; i < l - 1; i++) {
        var isOrderly = true;
        for (var j = 0; j < l - i - 1; j++) {
            if (compare(arr[j], arr[j + 1])) {
                _a = [arr[j + 1], arr[j]], arr[j] = _a[0], arr[j + 1] = _a[1];
                isOrderly = false;
            }
        }
        if (isOrderly) {
            return arr;
        }
    }
    return arr;
}
/**
 * 选择排序
 *
 * 时间复杂度: O(n^2)
 * 空间复杂度: O(1)
 * 非稳定排序算法
 * 原地排序算法
 *
 * 原理：与冒泡类似，只是选择排序会记录当前最大值的索引(数组下标)，直到遍历完后再做交换。
 *
 * @param arr
 * @param compare
 */
function selectSort(arr, compare) {
    var _a;
    for (var i = 0, l = arr.length; i < l - 1; i++) {
        var selectIndex = 0;
        for (var j = 1; j < l - i; j++) {
            if (compare(arr[j], arr[selectIndex])) {
                selectIndex = j;
            }
        }
        if (selectIndex !== l - i - 1) {
            _a = [arr[l - i - 1], arr[selectIndex]], arr[selectIndex] = _a[0], arr[l - i - 1] = _a[1];
        }
    }
    return arr;
}
/**
 * 插入排序
 *
 * 时间复杂度: O(n^2)
 * 空间复杂度: O(1)
 * 稳定排序算法
 * 原地排序算法
 *
 * 原理：从第二个元素开始，遍历已排序的序列，找到当前元素所在的位置(数值比当前值大的元素往后移)
 *
 * @param arr
 * @param compare
 */
function insertSort(arr, compare) {
    for (var i = 0, l = arr.length; i < l - 1; i++) {
        var insertIndex = i;
        var insertItem = arr[i + 1];
        while (insertIndex >= 0 && compare(arr[insertIndex], insertItem)) {
            arr[insertIndex + 1] = arr[insertIndex];
            insertIndex--;
        }
        arr[insertIndex + 1] = insertItem;
    }
    return arr;
}
/**
 * 希尔排序 (又名 缩小增量插入排序)
 *
 * 时间复杂度: O(n^2)
 * 空间复杂度: O(1)
 * 非稳定排序算法
 * 原地排序算法
 *
 * 原理: 插入排序的优化版本，在插入的基础上引入了增量，增量的作用是减少比较的次数
 *
 * @param arr
 * @param compare
 */
function shellSort(arr, compare) {
    var len = arr.length;
    var gap = len >> 1; // 增量默认值为数组长度的一半 len / 2, '>> 1' (二进制右移一位)
    while (gap > 0) {
        for (var i = gap; i < len; i++) {
            var insertIndex = i;
            var insertItem = arr[i];
            while (insertIndex - gap >= 0 &&
                compare(arr[insertIndex - gap], insertItem)) {
                arr[insertIndex] = arr[insertIndex - gap];
                insertIndex -= gap;
            }
            arr[insertIndex] = insertItem;
        }
        gap = gap >> 1; // 每轮增量再减半
    }
    return arr;
}
/**
 * 快速排序(随机版)
 *
 * 时间复杂度: O(n * logn)
 * 空间复杂度: O(1)
 * 非稳定的排序算法
 * 原地排序算法
 *
 * 原理：在排序序列中随机选择一个元素作为基准值，调整数组结构基准值左侧的元素都比基准值小，基准值右侧元素都比基准值大。
 *      将序列由基准值处一分为二，继续之前的操作。
 *
 * @param arr
 * @param L
 * @param R
 * @param compare
 */
function quickSort(arr, L, R, compare) {
    if (L < R) {
        var index = partition(arr, L, R, compare);
        if (index > L) {
            quickSort(arr, L, index - 1, compare);
        }
        if (index < R) {
            quickSort(arr, index + 1, R, compare);
        }
    }
    return arr;
}
/**
 * 快速排序的核心方法，作用是查找随机选择的基准值在该序列(arr)中的准确位置(下标值)。
 *
 * @param arr
 * @param L
 * @param R
 * @param compare
 */
function partition(arr, L, R, compare) {
    var _a, _b, _c;
    var index = (L + Math.random() * (R - L)) >> 0; // 随机产生一个下标值，将该数组元素作为基准值
    _a = [arr[R], arr[index]], arr[index] = _a[0], arr[R] = _a[1]; // 将基准值与末尾元素交换，方便后续操作
    var small = L - 1; // 该指针记录遍历过程中比基准值(arr[R])大的元素
    for (index = L; index < R; index++) {
        if (compare(arr[R], arr[index]) && index !== ++small) {
            /**
             * 比较基准值及当前遍历元素(arr[index])，若基准值(arr[R])比当前元素(arr[index])大，
             * 则将 arr[index] 与 arr[small](比arr[R]大的元素) 交换，该操作保证small指针前的元素都比 arr[R] 小, small 及之后的元素都比 arr[R] 大。
             *  */
            _b = [arr[small], arr[index]], arr[index] = _b[0], arr[small] = _b[1];
        }
    }
    ++small;
    _c = [arr[R], arr[small]], arr[small] = _c[0], arr[R] = _c[1];
    return small;
}
/**
 * 归并排序
 *
 * 时间复杂度: O(n * logn)
 * 空间复杂度: O(n)
 * 稳定的排序算法
 * 非原地排序算法
 *
 * 原理: 先分后合，先将序列拆分，后将拆分的序列块再合成有序的序列块。
 *
 * @param arr
 * @param L
 * @param R
 * @param compare
 */
function mergeSort(arr, L, R, compare) {
    if (L < R) {
        var mid = L + ((R - L) >> 1);
        // 先分
        mergeSort(arr, L, mid, compare);
        mergeSort(arr, mid + 1, R, compare);
        // 后合
        merge(arr, L, mid, R, [], compare);
    }
    return arr;
}
function merge(arr, L, M, R, temp, compare) {
    var left = L;
    var right = M + 1;
    var t = 0;
    while (left <= M && right <= R) {
        if (compare(arr[right], arr[left])) {
            temp[t++] = arr[left++];
        }
        else {
            temp[t++] = arr[right++];
        }
    }
    while (left <= M) {
        temp[t++] = arr[left++];
    }
    while (right <= R) {
        temp[t++] = arr[right++];
    }
    t = 0;
    while (L <= R) {
        arr[L++] = temp[t++];
    }
}
/**
 * 堆排序
 *
 * 时间复杂度: O(n * logn)
 * 空间复杂度: O(1)
 * 非稳定排序算法
 * 原地排序算法
 *
 * 原理：利用堆的特性，堆顶元素为最大/最小值。依次生成最大值。
 *
 * @param arr
 * @param compare
 */
function heapSort(arr, compare) {
    var _a;
    for (var i = 0, l = arr.length >> 0; i < l - 1; i++) {
        var lastIndex = l - 1 - i;
        createHeap(arr, lastIndex, compare);
        _a = [arr[lastIndex], arr[0]], arr[0] = _a[0], arr[lastIndex] = _a[1];
    }
    return arr;
}
function createHeap(arr, lastIndex, compare) {
    var _a;
    for (var i = lastIndex >> 1; i >= 0; i--) {
        var parent_1 = i;
        while ((parent_1 << 1) + 1 <= lastIndex) {
            var child = (parent_1 << 1) + 1;
            if (child + 1 <= lastIndex && compare(arr[child + 1], arr[child])) {
                child = child + 1;
            }
            if (compare(arr[parent_1], arr[child])) {
                break;
            }
            _a = [arr[parent_1], arr[child]], arr[child] = _a[0], arr[parent_1] = _a[1];
            parent_1 = child;
        }
    }
}
/**
 * 计数排序
 *
 * 时间复杂度: O(n)
 * 空间复杂度: O(n)
 * 非稳定排序算法
 * 非原地排序算法
 *
 * 原理: 先确定排序序列的长度(最大值减最小值 + 1),然后统计每个槽位的数量,之后在取出原数组的元素放入到排序序列中。
 *
 * @param arr
 * @param compare
 */
function countingSort(arr, compare) {
    var Max = Number.MIN_SAFE_INTEGER;
    var Min = Number.MAX_SAFE_INTEGER;
    for (var i = 0, l = arr.length >> 0; i < l; i++) {
        if (compare(arr[i], Max)) {
            Max = arr[i];
        }
        if (compare(Min, arr[i])) {
            Min = arr[i];
        }
    }
    var len = Max - Min + 1;
    var counter = new Array(len).fill(0);
    for (var i = 0, l = arr.length; i < l; i++) {
        counter[arr[i] - Min]++;
    }
    for (var i = 1; i < len; i++) {
        // 需要算上之前的数量，因为大的值下标一定比小值的大
        counter[i] += counter[i - 1];
    }
    var sortArr = new Array(arr.length);
    for (var i = 0, l = arr.length >> 0; i < l; i++) {
        sortArr[counter[arr[i] - Min] - 1] = arr[i];
        counter[arr[i] - Min]--;
    }
    return sortArr;
}
// usecase
var arr = [];
for (var i = 0; i < 10; i++) {
    arr.push((Math.random() * 1000) >> 0);
}
console.time();
console.log(bubbleSort(__spreadArrays(arr), function (a, b) { return a > b; }));
console.timeEnd();
console.time();
console.log(selectSort(__spreadArrays(arr), function (a, b) { return a > b; }));
console.timeEnd();
console.time();
console.log(insertSort(__spreadArrays(arr), function (a, b) { return a > b; }));
console.timeEnd();
console.time();
console.log(shellSort(__spreadArrays(arr), function (a, b) { return a > b; }));
console.timeEnd();
console.time();
console.log(quickSort(__spreadArrays(arr), 0, arr.length - 1, function (a, b) { return a > b; }));
console.timeEnd();
console.time();
console.log(mergeSort(__spreadArrays(arr), 0, arr.length - 1, function (a, b) { return a > b; }));
console.timeEnd();
console.time();
console.log(heapSort(__spreadArrays(arr), function (a, b) { return a > b; }));
console.timeEnd();
console.time();
console.log(countingSort(__spreadArrays(arr), function (a, b) { return a > b; }));
console.timeEnd();
/**
 * leetcode 215.数组中的第K个最大元素 | https://leetcode-cn.com/problems/kth-largest-element-in-an-array/
 *
 * 解法：利用快排的方法解决，每次选取一个基准值并确定该基准值在序列中的位置，然后将较该位置与 K 比较，其实与二分法类似，比较后选取 K 所在的序列继续执行同意的操作。
 *
 * 时间复杂度: O(logn)
 * 空间复杂度: O(1)
 * @param nums
 * @param k
 */
function findKthLargest(nums, k) {
    helper(nums, 0, nums.length - 1, k - 1);
    return nums[k - 1];
}
function helper(nums, L, R, k) {
    var compare = function (a, b) { return a < b; }; // 注意是找最大值。
    var index = partition(nums, L, R, compare);
    if (index > k && index > L) {
        helper(nums, L, index - 1, k);
    }
    else if (index < k && index < R) {
        helper(nums, index + 1, R, k);
    }
    else if (index === k) {
        return nums[index];
    }
}
console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2));
/**
 * leetcode 面试题 16.16. 部分排序 | https://leetcode-cn.com/problems/sub-sort-lcci/
 *
 * 解法: 由前往后遍历，查找区间的起始位置(记录一个最大值，出现比最大值小的元素是即为起始位)。
 *       由后往前遍历，查找区间的结束位置(记录一个最小值，出现比最小值大的元素即为结束位置)。
 *
 * @param array
 */
function subSort(array) {
    var start = -1;
    var end = -1;
    var max = Number.MIN_SAFE_INTEGER;
    var min = Number.MAX_SAFE_INTEGER;
    for (var i = 0, l = array.length >> 0; i < l; i++) {
        if (array[i] >= max) {
            max = array[i];
        }
        else {
            start = i;
        }
    }
    for (var i = (array.length >> 0) - 1; i >= 0; i--) {
        if (array[i] <= min) {
            max = array[i];
        }
        else {
            end = i;
        }
    }
    return [start, end];
}
