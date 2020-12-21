// 295. 数据流的中位数
class MedianFinder {
  // 大顶堆保存数据值小的一半
  maxHeap: Heap<number>;
  minHeap: Heap<number>;
  size: number;
  constructor() {
    this.maxHeap = new Heap<number>([], (a: number, b: number) => a > b);
    this.minHeap = new Heap<number>([], (a: number, b: number) => a < b);
    this.size = 0;
  }

  addNum(num: number): void {
    this.maxHeap.push(num);
    this.minHeap.push(this.maxHeap.pop()!);
    this.size++;
    if ((this.size & 1) !== 0) {
      this.maxHeap.push(this.minHeap.pop()!);
    }
  }

  findMedian(): number {
    if ((this.size & 1) === 0) {
      return (this.maxHeap.peek() + this.minHeap.peek()) / 2;
    } else {
      return this.maxHeap.peek();
    }
  }
}

console.log("--- 295. 数据流的中位数 ---");

let obj = new MedianFinder();
obj.addNum(1);
obj.addNum(2);
console.log(obj.findMedian());
obj.addNum(3);
console.log(obj.findMedian());
