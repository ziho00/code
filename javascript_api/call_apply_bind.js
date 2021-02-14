function myCall(context, ...args) {
  const _context = context || window;
  _context.fn = this;
  var result = _context.fn(...args);
  delete _context.fn;
  return result;
}

function myApply(context, args) {
  const _context = context || window;
  _context.fn = this;
  var result = _context.fn(...args);
  delete _context.fn;
  return result;
}

function myBind(context, args) {
  const fn = this;
  const bind_fn = function(...newArgs) {
    return fn.myCall(
      this instanceof bind_fn ? this : context,
      ...args,
      ...newArgs
    );
  };
  bind_fn.prototype = Object.create(fn.prototype);
  return bind_fn;
}

function call(context, ...args) {
  const _context = context || window;
  _context.fn = this;
  let result = _context.fn(...args);
  delete _context.fn;
  return result;
}

function apply(context, args) {
  const _context = context || window;
  _context.fn = this;
  const result = _context.fn(...args);
  _context.fn = null;
  return result;
}

function bind(context, ...args) {
  const fn = this;
  const bind_fn = function(...newArgs) {
    return fn.call(
      this instanceof bind_fn ? this : context,
      ...args,
      ...newArgs
    );
  };
  bind_fn.prototype = Object.create(fn.prototype);
  return bind_fn;
}
