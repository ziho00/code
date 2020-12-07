// 队列

/** 顺序队列 */
class OrderQueue<T> {
  data: T[];
  size: number;
  MAX_SIZE: number;
  constructor(data?: T[], maxSize?: number) {
    this.data = data || [];
    this.size = data?.length || 0;
    this.MAX_SIZE = maxSize || Number.MAX_SAFE_INTEGER;
  }

  enqueue(val: T): boolean {
    if (this.isFull()) {
      return false;
    }
    for (let i = this.size; i > 0; i--) {
      this.data[i] = this.data[i - 1];
    }
    this.data[0] = val;
    this.size++;
    return true;
  }

  dequeue(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    const res: T = this.data[this.size - 1];
    delete this.data[this.size - 1];
    this.size--;
    return res;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  isFull(): boolean {
    return this.size === this.MAX_SIZE;
  }
}

/** 链式队列 */
class ListQueue<T> {
  data: LinkLisk<T>;
  size: number;
  MAX_SIZE: number;
  constructor(maxSize?: number, data?: LinkLisk<T>) {
    this.data = data || new LinkLisk<T>();
    this.size = data?.size || 0;
    this.MAX_SIZE = maxSize || Number.MAX_SAFE_INTEGER;
  }

  enqueue(val: T) {
    if (this.isFull()) {
      return false;
    }
    this.data.unShift(val);
    this.size++;
    return true;
  }

  dequeue(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    const res = this.data.pop()!;
    this.size--;
    return res.val;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  isFull(): boolean {
    return this.size === this.MAX_SIZE;
  }
}

class CycleQueue<T> {
  data: T[];
  MAX_SIZE: number;
  head: number;
  tail: number;
  constructor(maxSize?: number) {
    this.MAX_SIZE = maxSize || 32;
    this.data = new Array(maxSize || 32);
    this.head = 0;
    this.tail = 0;
  }

  enqueue(val: T): boolean {
    if (this.isFull()) {
      return false;
    }
    this.data[this.tail] = val;
    this.tail = (this.tail + 1) % this.MAX_SIZE;
    return true;
  }

  dequeue(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    let res = this.data[this.head];
    this.head = (this.head + 1) % this.MAX_SIZE;
    return res;
  }

  isEmpty(): boolean {
    return this.tail === this.head;
  }

  isFull(): boolean {
    return (this.tail + 1) % this.MAX_SIZE === this.head;
  }
}

console.log("--- 队列 ---");
console.log("--- 顺序队列 ---");
let queue: OrderQueue<number> = new OrderQueue<number>([], 10);
for (let i = 0; i < 100; i++) {
  queue.enqueue((Math.random() * 1000) >> 0);
}
console.log(JSON.parse(JSON.stringify(queue)), ...queue.data);
while (queue.size) {
  console.log(queue.dequeue());
}

console.log("--- 链式队列 ---");
let list_queue: ListQueue<number> = new ListQueue<number>(10);
for (let i = 0; i < 100; i++) {
  list_queue.enqueue((Math.random() * 1000) >> 0);
}
console.log(JSON.parse(JSON.stringify(list_queue)));
while (list_queue.size) {
  console.log(list_queue.dequeue());
}

console.log("--- 循环队列 ---");
let cycleQueeu = new CycleQueue<number>(10);
for (let i = 0; i < 15; i++) {
  cycleQueeu.enqueue(i);
}
for (let i = 0; i < 5; i++) {
  console.log(cycleQueeu.dequeue());
}
for (let i = 0; i < 5; i++) {
  cycleQueeu.enqueue(10 + i);
}
console.log(cycleQueeu.data);
