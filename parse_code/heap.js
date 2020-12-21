"use strict";
var Heap = /** @class */ (function () {
    function Heap(data, compare, maxSize) {
        this.size = 0;
        this.data = [];
        this.compare =
            compare ||
                function (a, b) {
                    return a > b;
                };
        this.MAX_SIZE = maxSize || Number.MAX_SAFE_INTEGER;
        for (var i = 0, l = (data === null || data === void 0 ? void 0 : data.length) || 0; i < l; i++) {
            data && this.push(data[i]);
        }
    }
    Heap.prototype.push = function (val) {
        this.data.push(val);
        this._shiftUp(this.size++);
        if (this.size > this.MAX_SIZE) {
            this.pop();
        }
    };
    Heap.prototype.pop = function () {
        if (this.size === 0) {
            return null;
        }
        var ret = this.data[0];
        this._swap(0, this.size - 1);
        this.data.pop();
        this.size--;
        this._shiftDown(0);
        return ret;
    };
    Heap.prototype._shiftUp = function (idx) {
        while (idx > 0 &&
            this.compare(this.data[idx], this.data[this._parent(idx)])) {
            this._swap(idx, this._parent(idx));
            idx = this._parent(idx);
        }
    };
    Heap.prototype._shiftDown = function (idx) {
        while (this._child(idx) < this.size) {
            var child = this._child(idx);
            if (child + 1 < this.size &&
                this.compare(this.data[child + 1], this.data[child])) {
                child = child + 1;
            }
            if (this.compare(this.data[idx], this.data[child])) {
                break;
            }
            this._swap(idx, child);
            idx = child;
        }
    };
    Heap.prototype._parent = function (idx) {
        return (idx - 1) >> 1;
    };
    Heap.prototype._child = function (idx) {
        return (idx << 1) + 1;
    };
    Heap.prototype._swap = function (idx1, idx2) {
        var _a;
        _a = [this.data[idx2], this.data[idx1]], this.data[idx1] = _a[0], this.data[idx2] = _a[1];
    };
    return Heap;
}());
var heap = new Heap([4, 5, 8, 2], function (a, b) { return a < b; }, 3);
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
