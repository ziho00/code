// 栈

class Stack<T> {
  data: T[];
  size: number;
  MAX_SIZE: number;
  constructor(data: T[], maxSize: number) {
    this.data = data || [];
    this.size = (data && data.length) >> 0;
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
    let res: T | null = this.data.pop()!;
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

let stack: Stack<number> = new Stack<number>([], 10);

for (let i = 0; i < 100; i++) {
  stack.push((Math.random() * 1000) >> 0);
}
console.log(JSON.parse(JSON.stringify(stack)), ...stack.data);
while (stack.size) {
  console.log(stack.pop());
}
