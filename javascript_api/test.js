function A() {}
var a = new A();
console.log(a.a); // undefined
A.prototype.a = "a";
console.log(a.a); // a
