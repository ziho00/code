"use strict";
/**
 *  295. 数据流的中位数
 *
 *  思路：首先当数据流中的数据个位为奇数是，中位数只有一个，当为偶数时，中位数为两个数值的平均值。
 * 我们可以分别使用一个大顶堆和一个小顶堆来维护数据流中的前有序数组(数值较小的一半)和后有序数组(数值较大的一半)。
 * 然后中位数由堆顶元素决定。
 */
var MedianFinder = /** @class */ (function () {
    function MedianFinder() {
        this.maxHeap = new Heap([], function (a, b) { return a > b; });
        this.minHeap = new Heap([], function (a, b) { return a < b; });
        this.size = 0;
    }
    MedianFinder.prototype.addNum = function (num) {
        this.maxHeap.push(num);
        // 保证两个堆的平衡
        this.minHeap.push(this.maxHeap.pop());
        this.size++;
        if ((this.size & 1) !== 0) {
            // 如果总数为奇数 则 findMedian 返回值为大顶堆的堆顶元素
            this.maxHeap.push(this.minHeap.pop());
        }
    };
    MedianFinder.prototype.findMedian = function () {
        if ((this.size & 1) === 0) {
            return (this.maxHeap.peek() + this.minHeap.peek()) / 2;
        }
        else {
            return this.maxHeap.peek();
        }
    };
    return MedianFinder;
}());
console.log("--- 295. 数据流的中位数 ---");
var obj = new MedianFinder();
obj.addNum(1);
obj.addNum(2);
console.log(obj.findMedian());
obj.addNum(3);
console.log(obj.findMedian());
