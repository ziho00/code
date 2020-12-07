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
        this.head = null;
        this.size = 0;
        this.MAX_SIZE = (params === null || params === void 0 ? void 0 : params.MaxSize) || Number.MAX_SAFE_INTEGER;
    }
    LinkLisk.prototype.push = function (val) {
        if (this.isFull()) {
            return false;
        }
        var insertItem = new ListNode(val);
        if (this.isEmpty()) {
            this.head = insertItem;
            this.size++;
            return true;
        }
        var p = this.head;
        while (p.next) {
            p = p.next;
        }
        p.next = insertItem;
        this.size++;
        return true;
    };
    LinkLisk.prototype.unShift = function (val) {
        if (this.isFull()) {
            return false;
        }
        var insertItem = new ListNode(val);
        if (this.isEmpty()) {
            this.head = insertItem;
            this.size++;
            return true;
        }
        var p = this.head;
        insertItem.next = p;
        this.head = insertItem;
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
        var res = this.head;
        var next = (res === null || res === void 0 ? void 0 : res.next) || null;
        this.head = next;
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
        var p = this.head;
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
        var p = this.head;
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
    LinkLisk.prototype.isFull = function () {
        return this.size === this.MAX_SIZE;
    };
    return LinkLisk;
}());
/**
 * 双向链表节点
 */
var DoubleListNode = /** @class */ (function () {
    function DoubleListNode(val, pre, next) {
        this.val = val || null;
        this.pre = pre || null;
        this.next = next || null;
    }
    return DoubleListNode;
}());
/**
 * 双向链表
 */
var DoubleLinkList = /** @class */ (function () {
    function DoubleLinkList(maxSize) {
        this.head = null;
        this.size = 0;
        this.MAX_SIZE = maxSize || Number.MAX_SAFE_INTEGER;
    }
    DoubleLinkList.prototype.push = function (val) {
        if (this.isFull()) {
            return false;
        }
        var insertItem = new DoubleListNode(val);
        if (this.isEmpty()) {
            this.head = insertItem;
            this.size++;
            return true;
        }
        var p = this.head;
        while (p.next) {
            p = p.next;
        }
        p.next = insertItem;
        insertItem.pre = p;
        this.size++;
        return true;
    };
    DoubleLinkList.prototype.unShift = function (val) {
        if (this.isFull()) {
            return false;
        }
        var insertItem = new DoubleListNode(val);
        if (this.isEmpty()) {
            this.head = insertItem;
            this.size++;
            return true;
        }
        var p = this.head;
        insertItem.next = p;
        p.pre = insertItem;
        this.head = insertItem;
        this.size++;
        return true;
    };
    DoubleLinkList.prototype.shift = function () {
        if (this.isEmpty()) {
            return null;
        }
        var res = this.head;
        var next = this.head.next;
        this.head = next;
        if (next) {
            next.pre = null;
        }
        this.size--;
        return res;
    };
    DoubleLinkList.prototype.pop = function () {
        if (this.isEmpty()) {
            return null;
        }
        var last = this.getNode(this.size - 1);
        var pre = last.pre;
        if (pre) {
            pre.next = null;
        }
        else {
            this.head = null;
        }
        this.size--;
        return last;
    };
    DoubleLinkList.prototype.delete = function (index) {
        if (this.isEmpty() || index < 0 || index >= this.size) {
            return null;
        }
        if (index === 0) {
            return this.shift();
        }
        var res = this.getNode(index);
        var pre = res.pre;
        var next = res.next;
        pre.next = next;
        if (next) {
            next.pre = pre;
        }
        this.size--;
        return res;
    };
    DoubleLinkList.prototype.getNode = function (index) {
        if (this.isEmpty() || index < 0 || index >= this.size) {
            return null;
        }
        var p = this.head;
        var curIdx = 0;
        while (p) {
            if (curIdx === index) {
                return p;
            }
            p = p.next;
            curIdx++;
        }
        return null;
    };
    DoubleLinkList.prototype.find = function (val) {
        if (this.isEmpty()) {
            return null;
        }
        var p = this.head;
        while (p) {
            if (val === p.val) {
                return p;
            }
            p = p.next;
        }
        return null;
    };
    DoubleLinkList.prototype.isEmpty = function () {
        return this.size === 0;
    };
    DoubleLinkList.prototype.isFull = function () {
        return this.size === this.MAX_SIZE;
    };
    return DoubleLinkList;
}());
console.log("--- 单链表 ---");
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
console.log("--- 双向链表 ---");
var Dlist = new DoubleLinkList();
for (var i = 0; i < 10; i++) {
    Dlist.push((Math.random() * 1000) >> 0);
}
for (var i = 0; i < 10; i++) {
    Dlist.unShift((Math.random() * 1000) >> 0);
}
console.log("--- step 1 ---");
console.log(Dlist);
console.log(Dlist.delete(1));
console.log(Dlist.size);
console.log(Dlist.getNode(0));
console.log("--- step 2 ---");
for (var i = 0; i < 10; i++) {
    console.log(Dlist.shift());
}
for (var i = 0; i < 10; i++) {
    console.log(Dlist.pop());
}
