// var arr = [1, 2, 3, 4, 5, 6, 7, 8]

// var each = function(arr, callback){
//     for(var i=0; i<arr.length; i++){
//         callback.call(null, i, arr[i])    //把下标和元素当作参数传递给callback参数
//     }
// }

// each(arr, function(i, n){
//     console.log(i, n);
// })

let arr1 = [1,2,3,4];
let each1 = (arr, fn) => {
  for(let i = 0; i<arr.length; i++) {
    fn.call(null, i, arr[i]);
  }
}
each1(arr1,(i, n) => {
  console.log('test-i, n', i, n);
})

// 外部迭代器
// let Iterator = function (obj) {
//   let current = 0;

//   let next = function () {
//       current += 1
//   }

//   let isNotDone = function () {
//       return current <= obj.length
//   }

//   let getCurrentItem = function () {
//       return obj[current];
//   }

//   return {
//       next,
//       isNotDone,
//       getCurrentItem
//   }
// }

// //外部迭代器通过next方法进行手工迭代
// let arr = ['a', true, false, '10', 88, 741]
// let iterator1 = Iterator(arr)
// console.log(iterator1.getCurrentItem()); // a
// iterator1.next() 
// console.log(iterator1.getCurrentItem()); // true
// iterator1.next() 
// console.log(iterator1.getCurrentItem()); // false
// iterator1.next() 
// console.log(iterator1.getCurrentItem()); // '10'


// //改写compare函数
// let compare = function (iterator1, iterator2) {
//   while(iterator1.isNotDone() && iterator2.isNotDone()){
//       if(iterator1.getCurrentItem() !== iterator2.getCurrentItem()){
//           throw new Error('iterator1和iterator2不相等。')
//       }
//       iterator1.next()
//       iterator2.next()
//   }

//   console.log('iterator1和iterator2相等。');
// }

// let iterator1 = Iterator([1, 2, 3, 4])
// let iterator2 = Iterator([1, 2, 3, 4, 5])

// compare(iterator1, iterator2)

let MyIterator = (obj) => {
  let current = 0;
  
  let next = () => {
    current += 1;
  }

  let isNotDone = () => {
    return current <= obj.length;
  }
  let getCurrentItem = () => {
    return obj[current];
  }
  return {
    next,
    isNotDone,
    getCurrentItem,
  }
}
// let arr1 = ['a', 'f', 1, 2];
// let iteratorN = MyIterator(arr1);

let compare = (iterator1, iterator2) => {
  while(iterator1.isNotDone() && iterator2.isNotDone()) {
    console.log('test-', iterator1.getCurrentItem(), iterator2.getCurrentItem());
    if(iterator1.getCurrentItem() !== iterator2.getCurrentItem()) {
      // throw new Error('two arr is not same');
      console.log('two arr is not same');
      return;
    }
    iterator1.next();
    iterator2.next();
  }
  console.log('iterator1和iterator2相等。');
}
let iterator1 = MyIterator([1,2,3])
let iterator2 = MyIterator([1,3,3,4])
compare(iterator1, iterator2)

// 观察者模式
// 主题，保存状态，状态变化之后触发所有观察者对象
// class Subject{
//   constructor(){
//       this.state = 0
//       this.subs= [] // 存储观察者
//   }
//   mew(state){
//       this.state = state
//       this.notifyAllObservers()
//   }
//   notifyAllObservers(){
//       this.subs.forEach(observer=>{
//           observer.update()
//       })
//   }
//   attach(observer){  // 注册
//       this.subs.push(observer)
//   }
// }

// // 观察者
// class Observer{
//   constructor(name, subject){
//       this.name = name
//       this.subject = subject
//       this.subject.attach(this) // 注册进观察者
//   }
//   update(){
//       console.log(`${this.name}=====>${this.subject.state}`)
//   }
// }

// let cat=new Subject()
// let mouse=new Observer('mouse', cat)
// let person=new Observer('person', cat)

// /* 猫的大脑里有整个观察者的清单，哪里有老鼠，主人在哪里，
// 当他发生猫叫的时候，会去遍历清单（所有观察者，调用他们的方法）
// */
// cat.mew('喵喵喵喵喵~~~')
// cat.mew('哈哈哈哈~~~')
// cat.mew('嘿嘿嘿~~~')

class Subject {
  constructor() {
    this.state = 0;
    this.subs = [];
  }
  mew(state) {
    this.state = state;
    this.notifyAllObservers();
  }
  notifyAllObservers() {
    this.subs.forEach(val => {
      val.update();
    })
  }
  attach(observer) {
    this.subs.push(observer)
  }
}
class Observer {
  constructor(name, subject, fn) {
    this.name = name;
    this.subject = subject;
    this.subject.attach(this);
    this.fn = fn || function() {};
  }
  update() {
    this.fn();
  }
}
let cat = new Subject();
let mouse = new Observer('mouse', cat, ()=> {
  console.log('run');
})
let person = new Observer('person',cat, () => {
  console.log('see');
})
cat.mew();

// 发布订阅模式
// 调度中心
// class Public{
//   constructor(){
//       this.handlers = {}
//   }
//   on(eventType , handler){ // 订阅事件
//       if (!(eventType in this.handlers)) {
//           this.handlers[eventType] = [];
//       }
//       this.handlers[eventType].push(handler)
//       return this
//   }
//   emit(eventType){ // 发布事件
//       var handlerArgs = Array.prototype.slice.call(arguments, 1);
//       var length = this.handlers[eventType].length
//       for (var i = 0; i < length; i++) {
//           this.handlers[eventType][i].apply(this, handlerArgs);
//       }
//       return this;
//   }
//   off(eventType , handler){ // 删除订阅事件
//       var currentEvent = this.handlers[eventType];
//       var len = 0;
//       if (currentEvent) {
//           len = currentEvent.length;
//           for (var i = len - 1; i >= 0; i--) {
//               if (currentEvent[i] === handler) {
//                   currentEvent.splice(i, 1);
//               }
//           }
//       }
//       return this ;
//   }
// }

// // 订阅者
// function ObserverA(data){
//   console.log('a subscribe:' + data)
// }
// function ObserverB(data){
//   console.log('b subscribe:' + data)
// }
// function ObserverC(data){
//   console.log('c subscribe:' + data)
// }

// var publisher = new Public();
// //订阅事件
// publisher.on('a', ObserverA); // 给a订阅观察者ObserverA、ObserverC
// publisher.on('b', ObserverB); // 给b订阅观察者ObserverB
// publisher.on('a', ObserverC);

// //触发事件
// publisher.emit('a', 'a第1次时间发布');
// publisher.emit('b', 'b第1次时间发布');
// publisher.emit('a', 'a第2次时间发布');　

// //删除订阅事件
// publisher.off('a', ObserverA);

// // 再次触发
// publisher.emit('a', 'a第3次时间发布');
// publisher.emit('b', 'b第2次时间发布');

class Public {
  constructor() {
    this.handlers = {};
  }
  on(eventType, handler) {
    if (!(eventType in this.handlers)) {
      this.handlers[eventType] = [];
    }
    this.handlers[eventType].push(handler);
    return this;
  }
  emit(eventType, data) {
    this.handlers[eventType].map((v, i) => {
      this.handlers[eventType][i].apply(this, [data])
    }) 
  }
  off(eventType, handler) {
    let currentEvent = this.handlers[eventType];
    if (handler === undefined) {
      delete this.handlers[eventType];
      return this;
    }
    if (currentEvent) {
      let len = currentEvent.length;
      for(let i = len - 1; i >= 0; i--) {
        if (currentEvent[i] === handler) {
          currentEvent.splice(i, 1);
        }
      }
    }
    return this;
  }
}
let click1 = (data) => {
  console.log('click1', data);
}
let click2 = (data) => {
  console.log('click2', data);
}
let publicer = new Public();
publicer.on('click', click1);
publicer.on('click', click2);
publicer.emit('click', '222');

publicer.off('click', click2);
publicer.emit('click', 333)

// 状态（红、绿、黄灯）
// class State{
//   constructor(color){
//       this.color=color
//   }
//   handle(context){
//       console.log(`turn to ${this.color} light`)
//       // 设置状态
//       context.setState(this) 
//   }
// }

// // 主体
// class Context{
//   constructor(){
//       this.state=null
//   }
//   getState(){
//       return this.state
//   }
//   setState(state){
//       this.state = state
//   }
// }

// let context = new Context()

// let green = new State('green')
// let yellow = new State('yellow')
// let red = new State('red')

// // 绿灯亮了
// green.handle(context)
// console.log(context.getState())
// // 绿灯亮了
// yellow.handle(context)
// console.log(context.getState())
// // 绿灯亮了
// red.handle(context)
// console.log(context.getState())

 class State {
   constructor(color) {
     this.color = color;
   }
   handle(context) {
     console.log(`${this.color} light`);
     context.setState(this);
   }
 }
 class Context {
   constructor() {
     this.state = null;
   }
   getState() {
     return this.state;
   }
   setState(state) {
     this.state = state;
   }
 }
 let context = new Context();
 let red = new State('red');
 let green = new State('green');
 let yellow = new State('yellow');

 green.handle(context);
 console.log(context.getState());
 red.handle(context);
 console.log(context.getState());

// 模板模式
// var Beverage = function(param){
//   var boilWater = function(){
//       console.log('把水煮沸');
//   }

//   var brew = param.brew || function(){
//       throw new Error('必须传递brew方法')
//   }

//   var pourInCup = param.pourInCup || function(){
//       throw new Error('必须传递pourInCup方法')
//   }

//   var addCondiments = param.addCondiments || function(){
//       throw new Error('必须传递addCondiments方法')
//   }

// var customerWantsCondiments = param.customerWantsCondiments || function () {
//        return true;
//   }

//   var F = function(){}

//   F.prototype.init = function(){
//       boilWater();
//       brew();
//       pourInCup();
//       addCondiments();
//   }

//   return F;
// }

// var Coffee = new Beverage({
//   brew: function(){
//       console.log('用沸水冲泡咖啡');
//   },
//   pourInCup: function(){
//       console.log('把咖啡倒进杯子');
//   },
//   addCondiments: function(){
//       console.log('加糖和牛奶');
//   },
//   customerWantsCondiments: function () {
//        return window.confirm('您需要加调料么?');
//   }
// })

// var Tea = new Beverage({
//   brew: function(){
//       console.log('用沸水浸泡茶叶');
//   },
//   pourInCup: function(){
//       console.log('把茶倒进杯子');
//   },
//   addCondiments: function(){
//       console.log('加柠檬');
//   }
// })

// var coffee = new Coffee()
// coffee.init()

// var tea = new Tea()
// tea.init()

let Rpg = function(params) {
  let createCh = () => {
    console.log('create character');
  }
  let killMonster = params.killMonster
    || (() => {
      throw new Error('killMonster is need')
    })
  let buildTeam = params.buildTeam
    || (() => {
      return true;
    })
  let gameEnd = params.gameEnd
    || (() => {
      throw new Error('gameEnd is need')
    })

  var F = function() {};
  F.prototype.init = function() {
    createCh();
    buildTeam();
    killMonster();
    gameEnd();
  }
  return F;
}

let Arpg = new Rpg({
  killMonster: () => {
    console.log('killMonster，get 1024 point');
  },
  gameEnd: () => {
    console.log('no team, got 100 point');
  }
})
let arpg = new Arpg()
arpg.init()

// 职责链
//3个订单函数 ，它们都是节点函数
// var order500 = function(orderType, pay , stock){
//   if(orderType == '1' && pay == true){
//       console.log('500优惠券');
//   }else {
//       return 'nextSuccessor';     //我不知道下个节点是谁，反正把请求往后传递
//   }
// }

// var order200 = function(orderType, pay , stock){
//   if(orderType == '2' && pay == true){
//       console.log('200优惠券');
//   }else {
//       return 'nextSuccessor';     //我不知道下个节点是谁，反正把请求往后传递
//   }
// }

// var orderNormal = function(orderType, pay , stock){
//   if(stock > 0){
//       console.log('普通购物页面');
//   }else {
//       console.log('已无货');
//   }
// }

// //职责构造函数
// var Chain = function(fn){
//   this.fn = fn;
//   this.successor = null;
// }

// Chain.prototype.setNextSuccessor = function(successor){     //设置职责顺序方法
//   this.successor = successor
// }

// Chain.prototype.passRequest = function(){       //请求传递
//   var ret = this.fn.apply(this, arguments)

//   if(ret === 'nextSuccessor'){
//       return this.successor && this.successor.passRequest.apply(this.successor, arguments)
//   }

//   return ret;
// }

// //把3个订单函数分别包装成职责链的节点
// var chainOrder500 = new Chain(order500)
// var chainOrder200 = new Chain(order200)
// var chainOrderNormal = new Chain(orderNormal)

// //然后指定节点在职责链中的顺序
// chainOrder500.setNextSuccessor(chainOrder200)
// chainOrder200.setNextSuccessor(chainOrderNormal)

// //最后把请求传递给第一个节点，开启职责链模式传递
// chainOrder500.passRequest(1, true, 500)     //500优惠券
// chainOrder500.passRequest(3, true, 20)      //普通购物页面
// chainOrder500.passRequest(3, true, 0)       //已无货

// //此时如果中间有需求改动，只需如此做： 
// var order300 = function(){
//   if(orderType == '3' && pay == true){
//       console.log('300优惠券');
//   }else {
//       return 'nextSuccessor';     //我不知道下个节点是谁，反正把请求往后传递
//   }
// }
// var chainOrder300 = new Chain(order300)     //添加新职责节点
// chainOrder500.setNextSuccessor(chainOrder300)
// chainOrder300.setNextSuccessor(chainOrder300)   //修改职责链顺序
// chainOrder200.setNextSuccessor(chainOrderNormal)

// //这样，就可以完全不必去理会原来的订单函数代码，只需增加一个节点，然后重新设置职责链中的相关节点的顺序就行。

// 
let order500 = (orderType, pay, stock) => {
  if (orderType === 1 && pay === true) {
    console.log('500 count');
  } else {
    return 'next';
  }
}
let order200 = (orderType, pay, stock) => {
  if (orderType === 2 && pay === true) {
    console.log('200 count');
  } else {
    return 'next';
  }
}
let orderNormal = (orderType, pay, stock) => {
  if (stock > 0) {
    console.log('normal');
  } else {
    console.log('0');
  }
}

class Chain {
  constructor(fn) {
    this.fn = fn;
    this.nextFn = null;
  }
  setNextFn(nextFn) {
    this.nextFn = nextFn;
  }
  passRequest()  {
    let res = this.fn.apply(this, arguments);
    if (res === 'next') {

      return this.nextFn && this.nextFn.passRequest.apply(this.nextFn, arguments)
    }
    return res;
  }
}

let chainOrder500 = new Chain(order500);
let chainOrder200 = new Chain(order200);
let chainOrderNormal = new Chain(orderNormal);

chainOrder500.setNextFn(chainOrder200);
chainOrder200.setNextFn(chainOrderNormal);

chainOrder500.passRequest(1, true, 500);
chainOrder500.passRequest(3, true, 20);
chainOrder500.passRequest(3, true, 0);

let order300 = (orderType, pay, stock) => {
  if (orderType === 3 && pay === true) {
    console.log('300 count');
  } else {
    return 'next';
  }
}
let chainOrder300 = new Chain(order300);
chainOrder500.setNextFn(chainOrder300);
chainOrder300.setNextFn(chainOrder200);
chainOrder200.setNextFn(chainOrderNormal);

chainOrder500.passRequest(3, true, 0);
