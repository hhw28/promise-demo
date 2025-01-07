import * as chai from 'chai';

const assert = chai.assert;

describe("chai的使用", () => {
  it("测试相等", () =>{
    // @ts-ignore
    assert(3 === 3)
  })
})

import Promise from '../src/promise'
import * as sinon from 'sinon';

describe("Promise", () => {
  it("是一个类", () =>{
    assert.isFunction(Promise)
    assert.isObject(Promise.prototype)
  })
  it("new Promise() 必须接受一个函数", () => {
    // assert.throw 抛出错误，当传入不是函数的时候测试通过
    assert.throw(() => {
      // @ts-ignore
      new Promise()
    })
    assert.throw(() => {
      // @ts-ignore
      new Promise(1)
    })
    assert.throw(() => {
      // @ts-ignore
      new Promise(false)
    })
  })
  it("new Promise(fn) 会生成一个对象，对象有 then 方法", () => {
    const promise = new Promise(() => {})
    assert.isFunction(promise.then)
  })
  it("new Promise(fn) 中的 fn 立即执行", () => {
    let called = false
    new Promise(() => {
      called = true
    })
    // @ts-ignore
    assert(called === true)
  })
  it("new Promise(fn) 中的 fn 接受两个参数，resolve 和 reject", () => {
    new Promise((resolve, reject) => {
      assert.isFunction(resolve)
      assert.isFunction(reject)
    })
  })
  it("promise.then(success) 中的 success 会在 resolve 被调用时执行", () => {
    const success = sinon.fake()
    const promise = new Promise((resolve, reject) => {
      assert.isFalse(success.called)
      resolve()
      assert.isTrue(success.called)
    })
    promise.then(success)
  })
  // it("promise.then(null, fail) 中的 fail 会在 reject 被调用时执行", () => {
  //   let fail = sinon.fake()
  //   const promise = new Promise((resolve, reject) => {
  //     assert.isFalse(fail.called)
  //     reject()
  //     assert.isTrue(fail.called)
  //   })
  //   promise.then(null, fail)
  // })
})
