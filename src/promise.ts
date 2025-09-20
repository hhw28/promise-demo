export default class Promise2 {
  state: String = "pending";
  callbacks: Array<Array<Function>> = [];

  resolve(result) {
    setTimeout(() => {
      if (this.state !== "pending") return;
      this.state = "fulfilled";
      this.callbacks.forEach((handle) => {
        if (typeof handle[0] === "function") {
          handle[0].call(undefined, result);
        }
      });
    }, 0);
  }
  reject(reason) {
    setTimeout(() => {
      if (this.state !== "pending") return;
      this.state = "rejected";
      this.callbacks.forEach((handle) => {
        if (typeof handle[1] === "function") {
          handle[1].call(undefined, reason);
        }
      });
    }, 0);
  }
  constructor(fn: Function) {
    if (typeof fn !== "function") {
      throw new Error("Promise resolver undefined is not a function");
    }
    fn(this.resolve.bind(this), this.reject.bind(this));
  }

  then(succeed?: Function, fail?: Function) {
    const handle: Array<Function> = [];
    if (typeof succeed === "function") {
      handle[0] = succeed;
    }
    if (typeof fail === "function") {
      handle[1] = fail;
    }
    this.callbacks.push(handle);
    return undefined;
  }
}
