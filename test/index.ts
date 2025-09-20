import * as chai from "chai";

const assert: Chai.AssertStatic = chai.assert;

describe("chai的使用", () => {
  it("测试相等", () => {
    // @ts-ignore
    assert(3 === 3);
  });
});

import Promise from "../src/promise";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

chai.use(sinonChai);

describe("Promise", () => {
  it("是一个类", () => {
    assert.isFunction(Promise);
    assert.isObject(Promise.prototype);
  });
  it("new Promise() 必须接受一个函数", () => {
    // assert.throw 抛出错误，当传入不是函数的时候测试通过
    assert.throw(() => {
      // @ts-ignore
      new Promise();
    });
    assert.throw(() => {
      // @ts-ignore
      new Promise(1);
    });
    assert.throw(() => {
      // @ts-ignore
      new Promise(false);
    });
  });
  it("new Promise(fn) 会生成一个对象，对象有 then 方法", () => {
    const promise = new Promise(() => {});
    assert.isFunction(promise.then);
  });
  it("new Promise(fn) 中的 fn 立即执行", () => {
    // let called: boolean = false;
    // new Promise(() => {
    //   called = true;
    // });
    // // @ts-ignore
    // assert(called === true);
    let fn = sinon.fake();
    new Promise(fn);
    assert.isTrue(fn.called);
  });
  it("new Promise(fn) 中的 fn 接受两个函数, resolve 和 reject", (done) => {
    new Promise((resolve, reject) => {
      assert.isFunction(resolve);
      assert.isFunction(reject);
      done();
    });
  });
  it("promise.then(success) 中的 success 会在 resolve 被调用时执行", (done) => {
    const success = sinon.fake();
    const promise = new Promise((resolve, reject) => {
      // 该函数没有执行
      assert.isFalse(success.called);
      resolve();
      // 该函数执行了
      setTimeout(() => {
        assert.isTrue(success.called);
        done();
      }, 0);
    });
    promise.then(success);
  });
  it("promise.then(null, fail) 中的 fail 会在 reject 被调用时执行", (done) => {
    let fail = sinon.fake()
    const promise = new Promise((resolve, reject) => {
      assert.isFalse(fail.called)
      reject()
      setTimeout(() => {
        assert.isTrue(fail.called)
        done()
      }, 0)
    })
    // @ts-ignore
    promise.then(null, fail)
  })
  it("2.2.1 onFulfilled 和 onRejected 都是函数, 不是函数会忽略", () => {
    const promise = new Promise((resolve, reject) => {
      resolve()
    })
    // @ts-ignore
    promise.then(false, null)
  })
  it("2.2.2 onFulfilled 此函数在完成(fulfilled)状态后仅被调用一次，并把promise的值作为第一个参数传入", (done) => {
    let success = sinon.fake()
    const promise = new Promise((resolve, reject) => {
      assert.isFalse(success.called)
      resolve(111)
      resolve(22)
      setTimeout(() => {
        assert(promise.state === 'fulfilled')
        assert.isTrue(success.calledOnceWith(111))
        done()
      }, 0)
    })
    // @ts-ignore
    promise.then(success)
  })
  it("2.2.3 onRejected 此函数在(rejected)状态后仅被调用一次，并把promise的值作为第一个参数传入" , (done) => {
    let fail = sinon.fake()
    const promise = new Promise((resolve, reject) => {
      assert.isFalse(fail.called)
      reject(111)
      reject(22)
      setTimeout(() => {
        assert(promise.state === 'rejected')
        assert.isTrue(fail.calledOnceWith(111))
        done()
      }, 0)
    })
    // @ts-ignore
    promise.then(null, fail)
  })
  it("2.2.4 在我的代码执行完之前，不得调用 onFulfilled 或 onRejected (测试promise异步执行原理)", (done) => {
    let fn = sinon.fake()
    const promise = new Promise((resolve, reject) => {
      resolve()
    })
    promise.then(fn)
    assert.isFalse(fn.called)
    setTimeout(() => {
      assert.isTrue(fn.called)
      done()
    }, 0)
  })
  it("2.2.5 onFulfilled 和 onRejected 必须被作为函数调用，无this值", (done) => {
    const promise = new Promise((resolve, reject) => {
      resolve()
    })
    promise.then(function() {
      assert(this === undefined)
      done()
    })
  })
  it("2.2.6 then 可以在同一个promise上被多次调用", (done) => {
    let callbacks = [sinon.fake(), sinon.fake(), sinon.fake()]
    const promise = new Promise((resolve, reject) => {
      resolve()
    })
    promise.then(callbacks[0])
    promise.then(callbacks[1])
    promise.then(callbacks[2])
    setTimeout(() => {
      assert.isTrue(callbacks[0].called)
      assert.isTrue(callbacks[1].called)
      assert.isTrue(callbacks[2].called)
      assert.isTrue(callbacks[0].calledBefore(callbacks[1]))
      assert.isTrue(callbacks[1].calledBefore(callbacks[2]))
      done()
    }, 0)
  })
});
