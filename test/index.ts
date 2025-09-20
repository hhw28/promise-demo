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
});
