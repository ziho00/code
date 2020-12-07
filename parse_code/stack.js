"use strict";
// 栈
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var OrderStack = /** @class */ (function () {
    function OrderStack(data, maxSize) {
        this.data = data || [];
        this.size = (data === null || data === void 0 ? void 0 : data.length) || 0;
        this.MAX_SIZE = maxSize || Number.MAX_SAFE_INTEGER;
    }
    OrderStack.prototype.push = function (val) {
        if (this.isFull()) {
            return false;
        }
        this.data[this.size++] = val;
        return true;
    };
    OrderStack.prototype.pop = function () {
        if (this.isEmpty()) {
            return null;
        }
        var res = this.data[this.size - 1];
        delete this.data[this.size - 1];
        this.size--;
        return res;
    };
    OrderStack.prototype.isEmpty = function () {
        return this.size === 0;
    };
    OrderStack.prototype.isFull = function () {
        return this.size === this.MAX_SIZE;
    };
    return OrderStack;
}());
/**
 * 链式栈
 *
 * 由于方法基本都在链表中实现了，可以查看方法在链表中的具体实现
 *
 */
var ListStack = /** @class */ (function () {
    function ListStack(data, maxSize) {
        this.data = data || new LinkLisk();
        this.size = (data === null || data === void 0 ? void 0 : data.size) || 0;
        this.MAX_SIZE = maxSize || Number.MAX_SAFE_INTEGER;
    }
    ListStack.prototype.push = function (val) {
        if (this.isFull()) {
            return false;
        }
        this.data.push(val);
        this.size++;
        return true;
    };
    ListStack.prototype.pop = function () {
        if (this.isEmpty()) {
            return null;
        }
        var res = this.data.pop();
        this.size--;
        return res.val;
    };
    ListStack.prototype.isEmpty = function () {
        return this.size === 0;
    };
    ListStack.prototype.isFull = function () {
        return this.size === this.MAX_SIZE;
    };
    return ListStack;
}());
var stack = new OrderStack([], 10);
for (var i = 0; i < 100; i++) {
    stack.push((Math.random() * 1000) >> 0);
}
console.log.apply(console, __spreadArrays([JSON.parse(JSON.stringify(stack))], stack.data));
while (stack.size) {
    console.log(stack.pop());
}
