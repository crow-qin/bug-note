/**
 * 手写promise
 */
// 声明状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }
  // 初始状态
  state = PENDING
  // 回调函数
  fulfilledCallbacks = []
  rejectedCallbacks = []
  
  value = null
  // 失败
  err = null

  resolve = (value) => {
    if (this.state === PENDING) {
      this.state = FULFILLED
      this.value = value
      // this.fulfilledCallback && this.fulfilledCallback(value)
      while(this.fulfilledCallbacks.length) this.fulfilledCallbacks.shift()(value)
    }
  }

  reject = (err) => {
    if (this.state === PENDING) {
      this.state = REJECTED
      this.err = err
      // this.rejectedCallback && this.rejectedCallback(err)
      while(this.rejectedCallbacks.length) this.rejectedCallbacks.shift()(err)
    }
  }
  then(onFulfilled, onRejected) {
    const promise2 = new MyPromise((resolve, reject) => {
      // 避免循环调用
      // 这里有个问题，promise2这里其实是拿不到的，因为promise2还没有完成初始化
      // 这里需要用创建一个微任务，在微任务里面调用到的就是初始化完成的promise2。
      // 我们用 queueMicrotask 创建微任务
      const resolveMicrotask = () => {
        queueMicrotask(() => {
          try {
            const val = onFulfilled(this.value)
            this.resolvePromise(val, promise2, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
      const rejectMicrotask= () => {
        queueMicrotask(() => {
          try {
            const val = onRejected(this.err)
            this.resolvePromise(val, promise2, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
      if (this.state === FULFILLED) {
        resolveMicrotask()
      } else if (this.state === REJECTED) {
        rejectMicrotask()
      } else if (this.state === PENDING) {
        // this.fulfilledCallback = onFulfilled
        // this.rejectedCallback = onRejected
        // 储存回调
        this.fulfilledCallbacks.push(resolveMicrotask)
        this.rejectedCallbacks.push(rejectMicrotask)
      }
    })
    return promise2
  }
  // 判断是否链式调用
  resolvePromise(val, self, resolve, reject) {
    if (val === self) {
      return reject(new TypeError('The promise and the return value are the same'))
    }
    // if (val instanceof MyPromise) {
    //   val.then(resolve, reject)
    // }
    if (typeof val === 'object' || typeof val === 'function') {
      if (val === null) {
        return resolve(val)
      }
      let then
      try {
        then = val.then
      } catch (e) {
        return reject(e)
      }

      if (typeof then === 'function') {
        let called = false
        try {
          then.call(val, (res) => {
            if (called) return
            called = true
            this.resolvePromise(res, self, resolve, reject)
          }, (err) => {
            if (called) return
            called = true
            reject(err)
          })
        } catch (e) {
          if (called) return
          reject(e)
        }
      }
    }
    else {
      resolve(val)
    }
  }

  static resolve = (value) => {
    if (value instanceof MyPromise) {
      return value
    }
    return new MyPromise((resolve, reject) => {
      resolve(value)
    })
  }

  static reject = (reason) => {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }
}

let promise = new MyPromise((res, rej) => {
  setTimeout(() => {
    res(2)
  },1000)
})
promise
  .then(value => {
    console.log('test-1', value)
    return value * 2
  })
  .then(value => {
    console.log('test-2', value)
    return ++value
  })
  .then(value => {
    console.log('test-3', value)
    // return ++value
  })

