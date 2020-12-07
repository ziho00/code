// 栈

class OrderStack<T> {
  data: T[];
  size: number;
  MAX_SIZE: number;
  constructor(data?: T[], maxSize?: number) {
    this.data = data || [];
    this.size = data?.length || 0;
    this.MAX_SIZE = maxSize || Number.MAX_SAFE_INTEGER;
  }

  push(val: T): boolean {
    if (this.isFull()) {
      return false;
    }
    this.data[this.size++] = val;
    return true;
  }

  pop(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    let res: T | null = this.data[this.size - 1];
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

/**
 * 链式栈
 *
 * 由于方法基本都在链表中实现了，可以查看方法在链表中的具体实现
 *
 */
class ListStack<T> {
  data: LinkLisk<T>;
  MAX_SIZE: number;
  size: number;
  constructor(data?: LinkLisk<T>, maxSize?: number) {
    this.data = data || new LinkLisk<T>();
    this.size = data?.size || 0;
    this.MAX_SIZE = maxSize || Number.MAX_SAFE_INTEGER;
  }

  push(val: T): boolean {
    if (this.isFull()) {
      return false;
    }
    this.data.push(val);
    this.size++;
    return true;
  }

  pop(): T | null {
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

let stack: OrderStack<number> = new OrderStack<number>([], 10);

for (let i = 0; i < 100; i++) {
  stack.push((Math.random() * 1000) >> 0);
}
console.log(JSON.parse(JSON.stringify(stack)), ...stack.data);
while (stack.size) {
  console.log(stack.pop());
}
