"use strict";
// 队列
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
/** 顺序队列 */
var OrderQueue = /** @class */ (function () {
    function OrderQueue(data, maxSize) {
        this.data = data || [];
        this.size = (data === null || data === void 0 ? void 0 : data.length) || 0;
        this.MAX_SIZE = maxSize || Number.MAX_SAFE_INTEGER;
    }
    OrderQueue.prototype.enqueue = function (val) {
        if (this.isFull()) {
            return false;
        }
        for (var i = this.size; i > 0; i--) {
            this.data[i] = this.data[i - 1];
        }
        this.data[0] = val;
        this.size++;
        return true;
    };
    OrderQueue.prototype.dequeue = function () {
        if (this.isEmpty()) {
            return null;
        }
        var res = this.data[this.size - 1];
        delete this.data[this.size - 1];
        this.size--;
        return res;
    };
    OrderQueue.prototype.isEmpty = function () {
        return this.size === 0;
    };
    OrderQueue.prototype.isFull = function () {
        return this.size === this.MAX_SIZE;
    };
    return OrderQueue;
}());
/** 链式队列 */
var ListQueue = /** @class */ (function () {
    function ListQueue(maxSize, data) {
        this.data = data || new LinkLisk();
        this.size = (data === null || data === void 0 ? void 0 : data.size) || 0;
        this.MAX_SIZE = maxSize || Number.MAX_SAFE_INTEGER;
    }
    ListQueue.prototype.enqueue = function (val) {
        if (this.isFull()) {
            return false;
        }
        this.data.unShift(val);
        this.size++;
        return true;
    };
    ListQueue.prototype.dequeue = function () {
        if (this.isEmpty()) {
            return null;
        }
        var res = this.data.pop();
        this.size--;
        return res.val;
    };
    ListQueue.prototype.isEmpty = function () {
        return this.size === 0;
    };
    ListQueue.prototype.isFull = function () {
        return this.size === this.MAX_SIZE;
    };
    return ListQueue;
}());
var CycleQueue = /** @class */ (function () {
    function CycleQueue(maxSize) {
        this.MAX_SIZE = maxSize || 32;
        this.data = new Array(maxSize || 32);
        this.head = 0;
        this.tail = 0;
    }
    CycleQueue.prototype.enqueue = function (val) {
        if (this.isFull()) {
            return false;
        }
        this.data[this.tail] = val;
        this.tail = (this.tail + 1) % this.MAX_SIZE;
        return true;
    };
    CycleQueue.prototype.dequeue = function () {
        if (this.isEmpty()) {
            return null;
        }
        var res = this.data[this.head];
        this.head = (this.head + 1) % this.MAX_SIZE;
        return res;
    };
    CycleQueue.prototype.isEmpty = function () {
        return this.tail === this.head;
    };
    CycleQueue.prototype.isFull = function () {
        return (this.tail + 1) % this.MAX_SIZE === this.head;
    };
    return CycleQueue;
}());
console.log("--- 队列 ---");
console.log("--- 顺序队列 ---");
var queue = new OrderQueue([], 10);
for (var i = 0; i < 100; i++) {
    queue.enqueue((Math.random() * 1000) >> 0);
}
console.log.apply(console, __spreadArrays([JSON.parse(JSON.stringify(queue))], queue.data));
while (queue.size) {
    console.log(queue.dequeue());
}
console.log("--- 链式队列 ---");
var list_queue = new ListQueue(10);
for (var i = 0; i < 100; i++) {
    list_queue.enqueue((Math.random() * 1000) >> 0);
}
console.log(JSON.parse(JSON.stringify(list_queue)));
while (list_queue.size) {
    console.log(list_queue.dequeue());
}
console.log("--- 循环队列 ---");
var cycleQueeu = new CycleQueue(10);
for (var i = 0; i < 15; i++) {
    cycleQueeu.enqueue(i);
}
for (var i = 0; i < 5; i++) {
    console.log(cycleQueeu.dequeue());
}
for (var i = 0; i < 5; i++) {
    cycleQueeu.enqueue(10 + i);
}
console.log(cycleQueeu.data);
