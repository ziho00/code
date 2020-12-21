class Heap<T> {
  size: number;
  data: T[];
  compare: Function;
  MAX_SIZE: number;
  constructor(data?: T[], compare?: Function, maxSize?: number) {
    this.size = 0;
    this.data = [];
    this.compare =
      compare ||
      function(a: T, b: T) {
        return a > b;
      };
    this.MAX_SIZE = maxSize || Number.MAX_SAFE_INTEGER;
    for (let i = 0, l = data?.length || 0; i < l; i++) {
      data && this.push(data[i]);
    }
  }

  push(val: T) {
    this.data.push(val);
    this._shiftUp(this.size++);
    if (this.size > this.MAX_SIZE) {
      this.pop();
    }
  }

  pop(): T | null {
    if (this.size === 0) {
      return null;
    }
    let ret: T = this.data[0];
    this._swap(0, this.size - 1);
    this.data.pop();
    this.size--;
    this._shiftDown(0);
    return ret;
  }

  _shiftUp(idx: number) {
    while (
      idx > 0 &&
      this.compare(this.data[idx], this.data[this._parent(idx)])
    ) {
      this._swap(idx, this._parent(idx));
      idx = this._parent(idx);
    }
  }

  _shiftDown(idx: number) {
    while (this._child(idx) < this.size) {
      let child: number = this._child(idx);
      if (
        child + 1 < this.size &&
        this.compare(this.data[child + 1], this.data[child])
      ) {
        child = child + 1;
      }
      if (this.compare(this.data[idx], this.data[child])) {
        break;
      }
      this._swap(idx, child);
      idx = child;
    }
  }

  _parent(idx: number) {
    return (idx - 1) >> 1;
  }

  _child(idx: number) {
    return (idx << 1) + 1;
  }

  _swap(idx1: number, idx2: number) {
    [this.data[idx1], this.data[idx2]] = [this.data[idx2], this.data[idx1]];
  }

  peek() {
    return this.data[0];
  }
}

let heap = new Heap<number>([4, 5, 8, 2], (a: number, b: number) => a < b, 3);

console.log(heap.data[0]);

heap.push(3);
console.log(heap.data[0]);

heap.push(5);
console.log(heap.data[0]);

heap.push(10);
console.log(heap.data[0]);

heap.push(9);
console.log(heap.data[0]);

heap.push(4);
console.log(heap.data[0]);
