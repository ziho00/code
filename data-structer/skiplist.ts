const MAX_LEVEL = 32;

/**
 * 跳表 节点类
 */
class SLNode<T> {
  data: T | null;
  maxLevel: number;
  refer: Array<SLNode<T>>;
  constructor(data?: T, maxLevel?: number) {
    this.data = typeof data === "number" ? data : null;
    this.maxLevel = maxLevel || 0;
    this.refer = new Array(MAX_LEVEL);
  }
}

/**
 * 跳表
 */
class SkipList<T> {
  head: SLNode<T>;
  levelCount: number;
  isSame: Function;
  compare: Function;
  constructor(
    compare: Function = (a: T, b: T) => a > b,
    isSame: Function = (a: T, b: T) => a === b
  ) {
    this.compare = compare;
    this.isSame = isSame;
    this.head = new SLNode();
    this.levelCount = 1;
  }

  /**
   * 随机获取一个层级数，理论上层数据越大取得该值的概率越小((0.5)^n)
   */
  randomLevel(): number {
    let level: number = 1;
    for (let i = 1; i < MAX_LEVEL; i++) {
      if (Math.random() > 0.5) {
        level++;
      }
    }
    return level;
  }

  /**
   * 插入数据
   *
   * @param val
   */
  insert(val: T) {
    const level: number = this.randomLevel();
    const insertNode: SLNode<T> = new SLNode<T>(val, level);
    const update: Array<SLNode<T>> = new Array(level);
    let p = this.head;
    for (let i = level - 1; i >= 0; i--) {
      // 找到每一层中比插入数据值小的最后一个节点
      while (p.refer[i] !== undefined && this.compare(val, p.refer[i].data)) {
        p = p.refer[i];
      }
      // 记录每个节点的索引
      update[i] = p;
    }
    // 利用记录把节点连接起来，原理与在链表中插入节点相同
    for (let i = 0; i < level; i++) {
      insertNode.refer[i] = update[i].refer[i];
      update[i].refer[i] = insertNode;
    }
    // 更新最大层数
    if (this.levelCount < level) {
      this.levelCount = level;
    }
  }

  /**
   * 查找节点
   *
   * @param val
   */
  find(val: T): SLNode<T> | null {
    if (!val) {
      return null;
    }
    let p: SLNode<T> = this.head;
    for (let i = this.levelCount - 1; i >= 0; i--) {
      /**
       * 从上层往下层找 刚刚 说了 randomLevel 会大概率限制每层的元素个数， 所以正常来说最上层每个元素的跨度是最大的
       * 所以从最上层开始找找到比目标值大的节点(因为要找的节点一定在这个节点的左边)就往下找(等于跳出下面的while循环)
       */
      while (p.refer[i] !== undefined && this.compare(val, p.refer[i].data)) {
        p = p.refer[i];
      }
    }
    // 跳出循环就查看这个节点的值是否与 需要找的值相等
    if (p.refer[0] !== undefined && this.isSame(p.refer[0].data === val)) {
      return p.refer[0];
    }
    return null;
  }

  /**
   * 移除节点 = 查找节点 + 链表删除节点
   *
   * @param val
   */
  remove(val: T): SLNode<T> | null {
    let p: SLNode<T> = this.head;
    const update: Array<SLNode<T>> = new Array(this.levelCount);
    // 首先我们要查找需要删除的节点
    for (let i = this.levelCount - 1; i >= 0; i--) {
      while (p.refer[i] !== undefined && this.compare(val, p.refer[i].data)) {
        p = p.refer[i];
      }
      update[i] = p;
    }
    // 查看是否找到
    let node: SLNode<T>;
    if (p.refer[0] !== undefined && this.isSame(val, p.refer[0].data)) {
      // 找到就赋值给哨兵元素
      node = p.refer[0];
      for (let i = 0; i < this.levelCount; i++) {
        if (
          update[i].refer[i] !== undefined &&
          this.isSame(update[i].refer[i].data, val)
        ) {
          // 这行代码的作用相当于 将 原本索引的链路（假设删除了4） 2->4->8 变成 2->8
          update[i].refer[i] = update[i].refer[i].refer[i];
        }
      }
      return node;
    }
    return null;
  }

  /**
   * 获取所有节点
   *
   * 遍历最底层的索引
   */
  getAll(): Array<T> {
    let p = this.head;
    let result: Array<T> = [];
    while (p.refer[0] !== undefined) {
      result.push(p.refer[0].data!);
      p = p.refer[0];
    }
    return result;
  }
}

let skiplist = new SkipList<number>();

console.time();
for (let i = 0; i < 9999; i++) {
  skiplist.insert((Math.random() * 10000) >> 0);
}
console.timeEnd();

console.time();
console.log(skiplist.getAll());
console.timeEnd();
