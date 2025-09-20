
# Promise

- 类方法：all/allSettled/race/reject/resolve
- 对象属性：then/finally/catch
- 对象内部属性：state = pending/fulfilled/rejected

## 文档

- 原版：https://promisesaplus.com/
- 翻译：https://juejin.cn/post/6844903649852784647

## 测试工具
### chai
**依赖**

- chai
- @types/chai

**使用**

```
import * as chai from "chai";
const assert: Chai.AssertStatic = chai.assert;

describe("chai的使用", () => {
  it("测试相等", () => {
    // @ts-ignore
    assert(3 === 3);
  });
});
```

### sinon

函数测试库，提供一个假函数，结合chai使用判断函数调用状态

**依赖**

- sinon
- sinon-chai
- @types/sinon
- @types/sinon-chai

**使用**

```
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

chai.use(sinonChai);

it("测试函数被调用", () => {
    const fn = sinon.fake();
    assert.isTrue(fn.called)
  });
```



