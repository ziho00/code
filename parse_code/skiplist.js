"use strict";
var MAX_LEVEL = 32;
var SLNode = /** @class */ (function () {
    function SLNode(data, maxLevel) {
        this.data = typeof data === "number" ? data : null;
        this.maxLevel = maxLevel || 0;
        this.refer = new Array(MAX_LEVEL);
    }
    return SLNode;
}());
var SkipList = /** @class */ (function () {
    function SkipList(compare, isSame) {
        if (compare === void 0) { compare = function (a, b) { return a > b; }; }
        if (isSame === void 0) { isSame = function (a, b) { return a === b; }; }
        this.compare = compare;
        this.isSame = isSame;
        this.head = new SLNode();
        this.levelCount = 1;
    }
    /**
     * 随机获取一个层级数，理论上层数据越大取得该值的概率越小((0.5)^n)
     */
    SkipList.prototype.randomLevel = function () {
        var level = 1;
        for (var i = 1; i < MAX_LEVEL; i++) {
            if (Math.random() > 0.5) {
                level++;
            }
        }
        return level;
    };
    /**
     * 插入数据
     *
     * @param val
     */
    SkipList.prototype.insert = function (val) {
        var level = this.randomLevel();
        var insertNode = new SLNode(val, level);
        var update = new Array(level);
        var p = this.head;
        for (var i = level - 1; i >= 0; i--) {
            while (p.refer[i] !== undefined && this.compare(val, p.refer[i].data)) {
                p = p.refer[i];
            }
            update[i] = p;
        }
        for (var i = 0; i < level; i++) {
            insertNode.refer[i] = update[i].refer[i];
            update[i].refer[i] = insertNode;
        }
        if (this.levelCount < level) {
            this.levelCount = level;
        }
    };
    /**
     * 查找节点
     *
     * @param val
     */
    SkipList.prototype.find = function (val) {
        if (!val) {
            return null;
        }
        var p = this.head;
        for (var i = this.levelCount - 1; i >= 0; i--) {
            while (p.refer[i] !== undefined && this.compare(val, p.refer[i].data)) {
                p = p.refer[i];
            }
        }
        if (p.refer[0] !== undefined && this.isSame(p.refer[0].data === val)) {
            return p.refer[0];
        }
        return null;
    };
    /**
     * 移除节点
     *
     * @param val
     */
    SkipList.prototype.remove = function (val) {
        var node;
        var p = this.head;
        var update = new Array(this.levelCount);
        for (var i = this.levelCount - 1; i >= 0; i--) {
            while (p.refer[i] !== undefined && this.compare(val, p.refer[i].data)) {
                p = p.refer[i];
            }
            update[i] = p;
        }
        if (p.refer[0] !== undefined && this.isSame(val, p.refer[0].data)) {
            node = p.refer[0];
            for (var i = 0; i < this.levelCount; i++) {
                if (update[i].refer[i] !== undefined &&
                    this.isSame(update[i].refer[i].data, val)) {
                    update[i].refer[i] = update[i].refer[i].refer[i];
                }
            }
            return node;
        }
        return null;
    };
    /**
     * 获取所有节点
     */
    SkipList.prototype.getAll = function () {
        var p = this.head;
        var result = [];
        while (p.refer[0] !== undefined) {
            result.push(p.refer[0].data);
            p = p.refer[0];
        }
        return result;
    };
    return SkipList;
}());
var skiplist = new SkipList();
console.time();
for (var i = 0; i < 9999; i++) {
    skiplist.insert((Math.random() * 10000) >> 0);
}
console.timeEnd();
console.time();
console.log(skiplist.getAll());
console.timeEnd();
