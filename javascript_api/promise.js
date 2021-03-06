// 默认状态
const PENDING = "PENDING";
// 成功状态态
const FULFILLED = "FULFILLED";
// 失败状态
const REJECTED = "REJECTED";

class _Promise {
  constructor(exector) {
    // 默认状态
    this.status = PENDING;
    // 成功状态保存的数据
    this.value = undefined;
    // 失败状态保持的数据
    this.reason = undefined;
    // 成功回调队列
    this.onFulfilledCallbacks = [];
    // 失败回调队列
    this.onRejectedCallbacks = [];

    // 默认状态 -> 成功状态 的状态转换函数
    const resolve = (value) => {
      // 只能从默认状态 -> 成功状态
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach((fn) => fn(this.value));
      }
    };

    // 默认状态 -> 失败状态
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn(this.reason));
      }
    };

    try {
      exector(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  /**
   *
   * @param {*} onFulfilled  成功回调
   * @param {*} onRejected 失败回调
   */
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw new Error(reason instanceof Error ? reason.message : reason);
          };
    const self = this;
    return new _Promise((resolve, reject) => {
      if (self.status === PENDING) {
        self.onFulfilledCallbacks.push(() => {
          try {
            setTimeout(() => {
              const result = onFulfilled(self.value);
              result instanceof _Promise
                ? result.then(resolve, reject)
                : resolve(result);
            });
          } catch (e) {
            reject(e);
          }
        });
        self.onRejectedCallbacks.push(() => {
          try {
            setTimeout(() => {
              const result = onRejected(self.reason);
              result instanceof _Promise
                ? result.then(resolve, reject)
                : resolve(result);
            });
          } catch (e) {
            reject(e);
          }
        });
      } else if (self.status === FULFILLED) {
        try {
          setTimeout(() => {
            const result = onFulfilled(self.value);
            result instanceof _Promise
              ? result.then(resolve, reject)
              : resolve(result);
          });
        } catch (e) {
          reject(e);
        }
      } else if (self.status === REJECTED) {
        try {
          setTimeout(() => {
            const result = onRejected(self.reason);
            result instanceof _Promise
              ? result.then(resolve, reject)
              : resolve(result);
          });
        } catch (e) {
          reject(e);
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
    return new _Promise((resolve, reject) => {
      resolve(value);
    });
  }

  reject(reason) {
    return new _Promise((resolve, reject) => {
      reject(reason);
    });
  }

  all(promises) {
    const len = promises.length >> 0;
    const values = new Array(len);
    let count = 0;
    return new _Promise((resolve, reject) => {
      for (let i = 0; i < len; i++) {
        _Promise.resolve(promises[i]).then(
          (value) => {
            values[i] = value;
            count++;
            if (len === count) {
              resolve(values);
            }
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  }

  race(promises) {
    return new _Promise((resolve, reject) => {
      promises.forEach((p) => {
        _Promise.resolve(p).then(
          (value) => {
            resolve(value);
          },
          (error) => {
            reject(error);
          }
        );
      });
    });
  }
}

// 事件队列
class Scheduler {
  constructor() {
    this.queue = [];
    this.MAX_COUNT = 2;
    this.RUN_COUNT = 0;
  }

  add(promiseCreator) {
    this.queue.push(promiseCreator);
  }

  start() {
    for (let i = 0; i < this.MAX_COUNT; i++) {
      this.handle();
    }
  }

  handle() {
    if (!this.queue || !this.queue.length || this.RUN_COUNT >= this.MAX_COUNT) {
      return;
    }
    this.RUN_COUNT++;
    this.queue
      .shift()()
      .then(() => {
        this.RUN_COUNT--;
        this.handle();
      });
  }
}

// jsonp
function _jsonp({ url, params, callbackName }) {
  // 生成 url
  const initUrl = () => {
    let dataSrc = "";
    // 格式化参数
    Object.keys(params).forEach((key) => {
      dataSrc += `${key}=${params[key]}&`;
    });
    dataSrc += `callback=${callbackName}`;
    return `${url}?${dataSrc}`;
  };
  return new Promise((resolve, reject) => {
    try {
      const scriptElement = document.createElement("script");
      scriptElement.src = initUrl();
      document.body.appendChild(scriptElement);
      window[callbackName] = (data) => {
        resolve(data);
        document.removeChild(scriptElement);
      };
    } catch (e) {
      reject(e);
    }
  });
}

// ajax
function _ajax({ url, method, data }) {
  return new Promise((resolve, reject) => {
    const xhr = XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject("Mscrosoft.XMLHttp");
    method = method.toUpperCase();

    if (method === "GET") {
      let dataSrc = "";
      Object.keys(data).forEach((key, index) => {
        console.log(key, index);
        if (index !== 0) {
          dataSrc += "&";
        }
        dataSrc += `${key}=${data[key]}`;
      });
      if (dataSrc.length > 0) {
        url = `${url}?${dataSrc}`;
      }
    }
    xhr.open(method, url, false);

    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200 || xhr.status === 304) {
        resolve(xhr.responseText);
      } else {
        reject(new Error(xhr.responseText));
      }
    };
    if (method === "POST") {
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(data);
    } else {
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send();
    }
  });
}

new _Promise((resolve, reject) => {
  console.log(1);
  resolve(2);
})
  .then((res) => {
    console.log(res);
    return 3;
  })
  .then((res) => {
    console.log(res);
    return 4;
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
