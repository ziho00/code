// 默认状态
const PENDING = "PENDING";
// 成功状态态
const FULFILLED = "FULFILLED";
// 失败状态
const REJECTED = "REJECTED";

class _Promise {
  constructor(exector) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.fulfilledCallbacks = [];
    this.rejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.fulfilledCallbacks.forEach((fn) => fn(this.value));
      }
    };

    const reject = (reason) => {
      if (this.status === REJECTED) {
        this.status = REJECTED;
        this.reason = reason;
        this.rejectedCallbacks.forEach((fn) => fn(this.reason));
      }
    };

    try {
      exector(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw Error(reason instanceof Error ? reason.message : reason);
          };
    const _self = this;
    return new _Promise((resolve, reject) => {
      if (_self.status === PENDING) {
        _self.fulfilledCallbacks.push(() => {
          try {
            setTimeout(() => {
              const result = onFulfilled(_self.value);
              result instanceof _Promise
                ? result.then(resolve, reject)
                : resolve(result);
            });
          } catch (err) {
            reject(err);
          }
        });
        _self.rejectedCallbacks.push(() => {
          try {
            setTimeout(() => {
              const result = onRejected(_self.reason);
              result instanceof _Promise
                ? result.then(resolve, reject)
                : resolve(result);
            });
          } catch (err) {
            reject(err);
          }
        });
      } else if (_self.status === FULFILLED) {
        try {
          setTimeout(() => {
            const result = onFulfilled(_self.value);
            result instanceof _Promise
              ? result.then(resolve, reject)
              : resolve(result);
          });
        } catch (err) {
          reject(err);
        }
      } else if (_self.status === REJECTED) {
        try {
          setTimeout(() => {
            const result = onRejected(_self.reason);
            result instanceof _Promise
              ? result.then(resolve, reject)
              : resolve(result);
          });
        } catch (err) {
          reject(err);
        }
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  resolve(value) {
    if (value instanceof _Promise) {
      return value;
    }
    return new _Promise((resolve) => {
      resolve(value);
    });
  }

  reject(reason) {
    return new _Promise((resove, reject) => {
      reject(reason);
    });
  }

  race(promises) {
    return _Promise((resolve, reject) => {
      promises.forEach((p) => {
        _Promise.resolve(p).then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
      });
    });
  }

  all(promises) {
    const len = promises.length >> 0;
    const values = [];
    let count = 0;
    return _Promise((resolve, reject) => {
      for (let i = 0; i < len; i++) {
        _Promise.resolve(promises[i]).then(
          (res) => {
            values[i] = res;
            count++;
            if (count === len) {
              resolve(values);
            }
          },
          (err) => {
            reject(err);
          }
        );
      }
    });
  }
}

function ajax({ url, method, data }) {
  return new Promise((resolve, reject) => {
    const xhr = XMLHttpRequest
      ? new XMLHttpRequest()
      : ActiveXObject("Mscrosoft.XMLHttp");
    method = method.toUpperCase();
    if (method === "GET") {
      let dataStr = "";
      Object.keys(data).forEach((key, index) => {
        if (index !== 0) {
          dataStr += "&";
        }
        dataStr += `${key}=${data[key]}`;
      });
      if (dataStr.length >> 0 > 0) {
        url = `${url}?${dataStr}`;
      }
    }
    xhr.open(method, url, false);

    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return void 0;
      if (xhr.status === 200 || xhr.status === 304) {
        resolve(xhr.responseText);
      } else {
        reject(new Error(xhr.responseText));
      }
    };

    if (method === "POST") {
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(data);
    } else if (method === "GET") {
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send();
    }
  });
}
