/** 链表 */

/**
 * 链表节点
 */
class ListNode<T> {
  val: T | null;
  next: ListNode<T> | null;
  constructor(val?: T, next?: ListNode<T>) {
    this.val = val || null;
    this.next = next || null;
  }
}

/**
 * 单链表
 */
class LinkLisk<T> {
  head: ListNode<T> | null;
  size: number;
  MAX_SIZE: number;
  constructor(params?: { MaxSize?: number }) {
    this.head = null;
    this.size = 0;
    this.MAX_SIZE = params?.MaxSize || Number.MAX_SAFE_INTEGER;
  }
  public push(val: T): boolean {
    if (this.isFull()) {
      return false;
    }
    let insertItem = new ListNode<T>(val);
    if (this.isEmpty()) {
      this.head = insertItem;
      this.size++;
      return true;
    }
    let p = this.head!;
    while (p.next) {
      p = p.next;
    }
    p.next = insertItem;
    this.size++;
    return true;
  }

  public unShift(val: T): boolean {
    if (this.isFull()) {
      return false;
    }
    let insertItem = new ListNode<T>(val);
    if (this.isEmpty()) {
      this.head = insertItem;
      this.size++;
      return true;
    }
    let p = this.head;
    insertItem.next = p;
    this.head = insertItem;
    this.size++;
    return true;
  }

  public pop(): ListNode<T> | null {
    if (this.isEmpty()) {
      return null;
    }
    if (this.size === 1) {
      return this.shift();
    }
    let pre: ListNode<T> | null = this.getNode(this.size - 2);
    let res = pre!.next;
    pre!.next = null;
    this.size--;
    return res!;
  }

  public shift(): ListNode<T> | null {
    if (this.isEmpty()) {
      return null;
    }
    let res = this.head;
    let next = res?.next || null;
    this.head = next;
    this.size--;
    return res;
  }

  public delete(index: number): ListNode<T> | null {
    if (this.isEmpty() || index < 0 || index > this.size) {
      return null;
    }
    if (index === 0) {
      return this.shift();
    }
    let p = this.getNode(index - 1);
    if (p) {
      let res = p.next!;
      let next = res?.next;
      p.next = next;
      this.size--;
      return res;
    }
    return null;
  }

  public getNode(index: number): ListNode<T> | null {
    if (index < 0 || index > this.size) {
      return null;
    }
    let p = this.head;
    let cur = 0;
    while (p) {
      if (cur++ === index) {
        return p;
      }
      p = p.next;
    }
    return null;
  }

  public find(val: T): ListNode<T> | null {
    let p = this.head;
    while (p) {
      if (p.val === val) {
        return p;
      }
      p = p.next;
    }
    return null;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  isFull(): boolean {
    return this.size === this.MAX_SIZE;
  }
}

/**
 * 双向链表节点
 */
class DoubleListNode<T> {
  val: T | null;
  pre: DoubleListNode<T> | null;
  next: DoubleListNode<T> | null;
  constructor(val?: T, pre?: DoubleListNode<T>, next?: DoubleListNode<T>) {
    this.val = val || null;
    this.pre = pre || null;
    this.next = next || null;
  }
}

/**
 * 双向链表
 */
class DoubleLinkList<T> {
  head: DoubleListNode<T> | null;
  size: number;
  MAX_SIZE: number;
  constructor(maxSize?: number) {
    this.head = null;
    this.size = 0;
    this.MAX_SIZE = maxSize || Number.MAX_SAFE_INTEGER;
  }

  push(val: T): boolean {
    if (this.isFull()) {
      return false;
    }
    let insertItem: DoubleListNode<T> = new DoubleListNode<T>(val);
    if (this.isEmpty()) {
      this.head = insertItem;
      this.size++;
      return true;
    }
    let p: DoubleListNode<T> = this.head!;
    while (p.next) {
      p = p.next;
    }
    p.next = insertItem;
    insertItem.pre = p;
    this.size++;
    return true;
  }

  unShift(val: T): boolean {
    if (this.isFull()) {
      return false;
    }
    let insertItem: DoubleListNode<T> = new DoubleListNode<T>(val);
    if (this.isEmpty()) {
      this.head = insertItem;
      this.size++;
      return true;
    }
    let p: DoubleListNode<T> = this.head!;
    insertItem.next = p;
    p.pre = insertItem;
    this.head = insertItem;
    this.size++;
    return true;
  }

  shift(): DoubleListNode<T> | null {
    if (this.isEmpty()) {
      return null;
    }
    let res: DoubleListNode<T> = this.head!;
    let next: DoubleListNode<T> | null = this.head!.next;
    this.head = next;
    if (next) {
      next.pre = null;
    }
    this.size--;
    return res;
  }

  pop(): DoubleListNode<T> | null {
    if (this.isEmpty()) {
      return null;
    }
    let last: DoubleListNode<T> = this.getNode(this.size - 1)!;
    let pre = last.pre;
    if (pre) {
      pre.next = null;
    } else {
      this.head = null;
    }
    this.size--;
    return last;
  }

  delete(index: number): DoubleListNode<T> | null {
    if (this.isEmpty() || index < 0 || index >= this.size) {
      return null;
    }
    if (index === 0) {
      return this.shift();
    }
    let res = this.getNode(index)!;
    let pre = res.pre!;
    let next = res.next;
    pre.next = next;
    if (next) {
      next.pre = pre;
    }
    this.size--;
    return res;
  }

  getNode(index: number): DoubleListNode<T> | null {
    if (this.isEmpty() || index < 0 || index >= this.size) {
      return null;
    }
    let p: DoubleListNode<T> | null = this.head!;
    let curIdx: number = 0;
    while (p) {
      if (curIdx === index) {
        return p;
      }
      p = p.next;
      curIdx++;
    }
    return null;
  }

  find(val: T): DoubleListNode<T> | null {
    if (this.isEmpty()) {
      return null;
    }
    let p: DoubleListNode<T> | null = this.head!;
    while (p) {
      if (val === p.val) {
        return p;
      }
      p = p.next;
    }
    return null;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  isFull(): boolean {
    return this.size === this.MAX_SIZE;
  }
}

console.log("--- 单链表 ---");
let list = new LinkLisk<number>();
for (let i = 0; i < 10; i++) {
  list.push((Math.random() * 1000) >> 0);
}

for (let i = 0; i < 10; i++) {
  list.unShift((Math.random() * 1000) >> 0);
}
console.log("--- step 1 ---");
console.log(JSON.parse(JSON.stringify(list)));
console.log(list.delete(1));
console.log(list.size);
console.log(list.getNode(0));

console.log("--- step 2 ---");

for (let i = 0; i < 10; i++) {
  console.log(list.shift());
}

for (let i = 0; i < 10; i++) {
  console.log(list.pop());
}

console.log("--- 双向链表 ---");
let Dlist = new DoubleLinkList<number>();
for (let i = 0; i < 10; i++) {
  Dlist.push((Math.random() * 1000) >> 0);
}

for (let i = 0; i < 10; i++) {
  Dlist.unShift((Math.random() * 1000) >> 0);
}
console.log("--- step 1 ---");
console.log(Dlist);
console.log(Dlist.delete(1));
console.log(Dlist.size);
console.log(Dlist.getNode(0));

console.log("--- step 2 ---");

for (let i = 0; i < 10; i++) {
  console.log(Dlist.shift());
}

for (let i = 0; i < 10; i++) {
  console.log(Dlist.pop());
}
