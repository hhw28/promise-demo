export default class Promise2 {
  succeed?: Function
  fail?: Function

  resolve() {
    setTimeout(() => {
      this.succeed?.()
    },0)
  }
  reject() {
    setTimeout(() => {
      this.fail?.()
    },0)
  }
  constructor(fn: Function) {
    if (typeof fn !== 'function') {
      throw new Error('Promise resolver undefined is not a function')
    }
    fn(this.resolve.bind(this), this.reject.bind(this))
  }

  then(succeed: Function, fail?: Function) {
    this.succeed = succeed
    this.fail = fail
  }
}
