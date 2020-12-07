"use strict";
// 栈
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var Stack = /** @class */ (function () {
    function Stack(data, maxSize) {
        this.data = data || [];
        this.size = (data && data.length) >> 0;
        this.MAX_SIZE = maxSize || Number.MAX_SAFE_INTEGER;
    }
    Stack.prototype.push = function (val) {
        if (this.isFull()) {
            return false;
        }
        this.data.push(val);
        this.size++;
        return true;
    };
    Stack.prototype.pop = function () {
        if (this.isEmpty()) {
            return null;
        }
        var res = this.data.pop();
        this.size--;
        return res;
    };
    Stack.prototype.isEmpty = function () {
        return this.size === 0;
    };
    Stack.prototype.isFull = function () {
        return this.size === this.MAX_SIZE;
    };
    return Stack;
}());
var stack = new Stack([], 10);
for (var i = 0; i < 100; i++) {
    stack.push((Math.random() * 1000) >> 0);
}
console.log.apply(console, __spreadArrays([JSON.parse(JSON.stringify(stack))], stack.data));
while (stack.size) {
    console.log(stack.pop());
}
