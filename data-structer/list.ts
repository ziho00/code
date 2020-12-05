/** 链表 */

/**
 * 链表节点
 */
class ListNode<T> {
  val: T | undefined;
  next: ListNode<T> | undefined | null;
  constructor(params?: { val?: T; next?: ListNode<T> }) {
    this.val = params?.val;
    this.next = params?.next;
  }
}

/**
 * 单链表
 */
class LinkLisk<T> {
  head: ListNode<T>;
  size: number;
  MAX_SIZE: number;
  constructor(params?: { MaxSize?: number }) {
    this.head = new ListNode<T>();
    this.size = 0;
    this.MAX_SIZE = params?.MaxSize || Number.MAX_SAFE_INTEGER;
  }
  public push(val: T): boolean {
    if (this.size >= this.MAX_SIZE) {
      return false;
    }
    let p = this.head;
    while (p.next) {
      p = p.next;
    }
    p.next = new ListNode<T>({ val });
    this.size++;
    return true;
  }

  public unShift(val: T): boolean {
    if (this.size >= this.MAX_SIZE) {
      return false;
    }
    let insertItem = new ListNode<T>({ val });
    let p = this.head.next;
    insertItem.next = p;
    this.head.next = insertItem;
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
    let res = this.head.next!;
    let next = res?.next || null;
    this.head.next = next;
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
    let p = this.head.next;
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
    let p = this.head.next;
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
}

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
