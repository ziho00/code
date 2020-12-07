"use strict";
/** 链表 */
/**
 * 链表节点
 */
var ListNode = /** @class */ (function () {
    function ListNode(val, next) {
        this.val = val || null;
        this.next = next || null;
    }
    return ListNode;
}());
/**
 * 单链表
 */
var LinkLisk = /** @class */ (function () {
    function LinkLisk(params) {
        this.head = new ListNode();
        this.size = 0;
        this.MAX_SIZE = (params === null || params === void 0 ? void 0 : params.MaxSize) || Number.MAX_SAFE_INTEGER;
    }
    LinkLisk.prototype.push = function (val) {
        if (this.size >= this.MAX_SIZE) {
            return false;
        }
        var p = this.head;
        while (p.next) {
            p = p.next;
        }
        p.next = new ListNode(val);
        this.size++;
        return true;
    };
    LinkLisk.prototype.unShift = function (val) {
        if (this.size >= this.MAX_SIZE) {
            return false;
        }
        var insertItem = new ListNode(val);
        var p = this.head.next;
        insertItem.next = p;
        this.head.next = insertItem;
        this.size++;
        return true;
    };
    LinkLisk.prototype.pop = function () {
        if (this.isEmpty()) {
            return null;
        }
        if (this.size === 1) {
            return this.shift();
        }
        var pre = this.getNode(this.size - 2);
        var res = pre.next;
        pre.next = null;
        this.size--;
        return res;
    };
    LinkLisk.prototype.shift = function () {
        if (this.isEmpty()) {
            return null;
        }
        var res = this.head.next;
        var next = (res === null || res === void 0 ? void 0 : res.next) || null;
        this.head.next = next;
        this.size--;
        return res;
    };
    LinkLisk.prototype.delete = function (index) {
        if (this.isEmpty() || index < 0 || index > this.size) {
            return null;
        }
        if (index === 0) {
            return this.shift();
        }
        var p = this.getNode(index - 1);
        if (p) {
            var res = p.next;
            var next = res === null || res === void 0 ? void 0 : res.next;
            p.next = next;
            this.size--;
            return res;
        }
        return null;
    };
    LinkLisk.prototype.getNode = function (index) {
        if (index < 0 || index > this.size) {
            return null;
        }
        var p = this.head.next;
        var cur = 0;
        while (p) {
            if (cur++ === index) {
                return p;
            }
            p = p.next;
        }
        return null;
    };
    LinkLisk.prototype.find = function (val) {
        var p = this.head.next;
        while (p) {
            if (p.val === val) {
                return p;
            }
            p = p.next;
        }
        return null;
    };
    LinkLisk.prototype.isEmpty = function () {
        return this.size === 0;
    };
    return LinkLisk;
}());
var list = new LinkLisk();
for (var i = 0; i < 10; i++) {
    list.push((Math.random() * 1000) >> 0);
}
for (var i = 0; i < 10; i++) {
    list.unShift((Math.random() * 1000) >> 0);
}
console.log("--- step 1 ---");
console.log(JSON.parse(JSON.stringify(list)));
console.log(list.delete(1));
console.log(list.size);
console.log(list.getNode(0));
console.log("--- step 2 ---");
for (var i = 0; i < 10; i++) {
    console.log(list.shift());
}
for (var i = 0; i < 10; i++) {
    console.log(list.pop());
}
