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
function bubbleSort<T>(arr: Array<T>, compare: Function): Array<T> {
  for (let i: number = 0, l: number = arr.length; i < l - 1; i++) {
    let isOrderly = true;
    for (let j: number = 0; j < l - i - 1; j++) {
      if (compare(arr[j], arr[j + 1])) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
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
function selectSort<T>(arr: Array<T>, compare: Function): Array<T> {
  for (let i: number = 0, l: number = arr.length; i < l - 1; i++) {
    let selectIndex: number = 0;
    for (let j: number = 1; j < l - i; j++) {
      if (compare(arr[j], arr[selectIndex])) {
        selectIndex = j;
      }
    }
    if (selectIndex !== l - i - 1) {
      [arr[selectIndex], arr[l - i - 1]] = [arr[l - i - 1], arr[selectIndex]];
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
function insertSort<T>(arr: Array<T>, compare: Function): Array<T> {
  for (let i: number = 0, l: number = arr.length; i < l - 1; i++) {
    let insertIndex: number = i;
    let insertItem: T = arr[i + 1];
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
function shellSort<T>(arr: Array<T>, compare: Function): Array<T> {
  let len: number = arr.length;
  let gap: number = len >> 1; // 增量默认值为数组长度的一半 len / 2, '>> 1' (二进制右移一位)
  while (gap > 0) {
    for (let i: number = gap; i < len; i++) {
      let insertIndex: number = i;
      let insertItem: T = arr[i];
      while (
        insertIndex - gap >= 0 &&
        compare(arr[insertIndex - gap], insertItem)
      ) {
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
function quickSort<T>(
  arr: Array<T>,
  L: number,
  R: number,
  compare: Function
): Array<T> {
  if (L < R) {
    const index: number = partition(arr, L, R, compare);
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
function partition<T>(
  arr: Array<T>,
  L: number,
  R: number,
  compare: Function
): number {
  let index: number = (L + Math.random() * (R - L)) >> 0; // 随机产生一个下标值，将该数组元素作为基准值
  [arr[index], arr[R]] = [arr[R], arr[index]]; // 将基准值与末尾元素交换，方便后续操作
  let small: number = L - 1; // 该指针记录遍历过程中比基准值(arr[R])大的元素
  for (index = L; index < R; index++) {
    if (compare(arr[R], arr[index]) && index !== ++small) {
      /**
       * 比较基准值及当前遍历元素(arr[index])，若基准值(arr[R])比当前元素(arr[index])大，
       * 则将 arr[index] 与 arr[small](比arr[R]大的元素) 交换，该操作保证small指针前的元素都比 arr[R] 小, small 及之后的元素都比 arr[R] 大。
       *  */
      [arr[index], arr[small]] = [arr[small], arr[index]];
    }
  }
  ++small;
  [arr[small], arr[R]] = [arr[R], arr[small]];
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
function mergeSort<T>(
  arr: Array<T>,
  L: number,
  R: number,
  compare: Function
): Array<T> {
  if (L < R) {
    const mid = L + ((R - L) >> 1);
    // 先分
    mergeSort(arr, L, mid, compare);
    mergeSort(arr, mid + 1, R, compare);
    // 后合
    merge(arr, L, mid, R, [], compare);
  }
  return arr;
}

function merge<T>(
  arr: Array<T>,
  L: number,
  M: number,
  R: number,
  temp: Array<T>,
  compare: Function
): void {
  let left: number = L;
  let right: number = M + 1;
  let t: number = 0;
  while (left <= M && right <= R) {
    if (compare(arr[right], arr[left])) {
      temp[t++] = arr[left++];
    } else {
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
function heapSort<T>(arr: Array<T>, compare: Function): Array<T> {
  for (let i: number = 0, l: number = arr.length >> 0; i < l - 1; i++) {
    let lastIndex = l - 1 - i;
    createHeap(arr, lastIndex, compare);
    [arr[0], arr[lastIndex]] = [arr[lastIndex], arr[0]];
  }
  return arr;
}

function createHeap<T>(
  arr: Array<T>,
  lastIndex: number,
  compare: Function
): void {
  for (let i: number = lastIndex >> 1; i >= 0; i--) {
    let parent: number = i;
    while ((parent << 1) + 1 <= lastIndex) {
      let child: number = (parent << 1) + 1;
      if (child + 1 <= lastIndex && compare(arr[child + 1], arr[child])) {
        child = child + 1;
      }
      if (compare(arr[parent], arr[child])) {
        break;
      }
      [arr[child], arr[parent]] = [arr[parent], arr[child]];
      parent = child;
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
function countingSort(arr: Array<number>, compare: Function): Array<number> {
  let Max: number = Number.MIN_SAFE_INTEGER;
  let Min: number = Number.MAX_SAFE_INTEGER;
  for (let i: number = 0, l = arr.length >> 0; i < l; i++) {
    if (compare(arr[i], Max)) {
      Max = arr[i];
    }
    if (compare(Min, arr[i])) {
      Min = arr[i];
    }
  }
  let len: number = Max - Min + 1;
  const counter = new Array(len).fill(0);
  for (let i: number = 0, l = arr.length; i < l; i++) {
    counter[arr[i] - Min]++;
  }
  for (let i: number = 1; i < len; i++) {
    // 需要算上之前的数量，因为大的值下标一定比小值的大
    counter[i] += counter[i - 1];
  }
  let sortArr: Array<number> = new Array(arr.length);
  for (let i: number = 0, l: number = arr.length >> 0; i < l; i++) {
    sortArr[counter[arr[i] - Min] - 1] = arr[i];
    counter[arr[i] - Min]--;
  }
  return sortArr;
}

// usecase
let arr: number[] = [];

for (let i: number = 0; i < 10; i++) {
  arr.push((Math.random() * 1000) >> 0);
}

console.time();
console.log(bubbleSort<number>([...arr], (a: number, b: number) => a > b));
console.timeEnd();

console.time();
console.log(selectSort<number>([...arr], (a: number, b: number) => a > b));
console.timeEnd();

console.time();
console.log(insertSort<number>([...arr], (a: number, b: number) => a > b));
console.timeEnd();

console.time();
console.log(shellSort<number>([...arr], (a: number, b: number) => a > b));
console.timeEnd();

console.time();
console.log(
  quickSort<number>(
    [...arr],
    0,
    arr.length - 1,
    (a: number, b: number) => a > b
  )
);
console.timeEnd();

console.time();
console.log(
  mergeSort<number>(
    [...arr],
    0,
    arr.length - 1,
    (a: number, b: number) => a > b
  )
);
console.timeEnd();

console.time();
console.log(heapSort<number>([...arr], (a: number, b: number) => a > b));
console.timeEnd();

console.time();
console.log(countingSort([...arr], (a: number, b: number) => a > b));
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
function findKthLargest(nums: number[], k: number): number {
  helper(nums, 0, nums.length - 1, k - 1);
  return nums[k - 1];
}

function helper(nums: number[], L: number, R: number, k: number) {
  const compare = (a: number, b: number) => a < b; // 注意是找最大值。
  let index = partition<number>(nums, L, R, compare);
  if (index > k && index > L) {
    helper(nums, L, index - 1, k);
  } else if (index < k && index < R) {
    helper(nums, index + 1, R, k);
  } else if (index === k) {
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
function subSort(array: number[]): number[] {
  let start: number = -1;
  let end: number = -1;
  let max: number = Number.MIN_SAFE_INTEGER;
  let min: number = Number.MAX_SAFE_INTEGER;
  for (let i: number = 0, l = array.length >> 0; i < l; i++) {
    if (array[i] >= max) {
      max = array[i];
    } else {
      start = i;
    }
  }
  for (let i: number = (array.length >> 0) - 1; i >= 0; i--) {
    if (array[i] <= min) {
      max = array[i];
    } else {
      end = i;
    }
  }
  return [start, end];
}
