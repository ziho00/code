"use strict";
// 295. 数据流的中位数
var MedianFinder = /** @class */ (function () {
    function MedianFinder() {
        this.maxHeap = new Heap([], function (a, b) { return a > b; });
        this.minHeap = new Heap([], function (a, b) { return a < b; });
        this.size = 0;
    }
    MedianFinder.prototype.addNum = function (num) {
        this.maxHeap.push(num);
        this.minHeap.push(this.maxHeap.pop());
        this.size++;
        if ((this.size & 1) !== 0) {
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
