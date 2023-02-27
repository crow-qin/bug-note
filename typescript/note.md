# 2021

## w

=d5--0910=

### tip: ts 函数声明重载

函数声明可以多次定义, 这样函数可以根据定义的先后顺序进行匹配

```ts
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | void {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```

## w

=d2--0914=

### 泛型
```ts
function createArr<T>(num: number, value: T): Array<T> {
  return new Array(num)
    .toString()
    .split(',')
    .map(() => {
      return value;
    });
}
let arr = createArr(4, '4');
console.log(arr);
```
```ts
// 泛型接口
interface CreateArrIF {
  <T>(num: number, value: T): Array<T>;
}
let createArr1: CreateArrIF = function<T>(num: number, value: T): Array<T> {
  return new Array(num)
    .toString()
    .split(',')
    .map(() => {
      return value;
    });
};
let arr1 = createArr1(5, 'a');
console.log(arr1);
```

```ts
// 进一步泛型接口
interface CreateArr2IF<T> {
  (num: number, value: T): Array<T>;
}
let createArr2: CreateArr2IF<any> = function<T>(
  num: number,
  value: T
): Array<T> {
  return new Array(num)
    .toString()
    .split(',')
    .map(() => {
      return value;
    });
};
let arr2 = createArr2(6, 'b');
console.log(arr2);
```

```ts
// 泛型约束
interface HasLength {
  length: number;
}
function fn1<T extends HasLength>(arg: T): number {
  let len = arg.length;
  return len;
}
```
```ts
// 泛型相互约束
function copyFields<T extends U, U>(target: T, source: U): T {
  for (let id in source) {
    target[id] = (<T>source)[id];
  }
  return target;
}
```
```ts
let x = { a: 1, b: 2, c: 3, d: 4 };
let res = copyFields(x, { b: 10, d: 20 });
console.log(res);
```
```ts
// 泛型类
class ClassIF<T> {
  val: T;
  add: (x: T, y: T) => T;
}
let classIF = new ClassIF<number>();
classIF.val = 0;
classIF.add = (x, y) => x + y;
console.log(classIF.add(1, 4));
```

### 断言
```ts
// 断言
interface Animal {
  name: string;
}
interface Cat {
  name: string;
  run(): void;
}
function getAnimal(cat: Cat) {
  return cat as Animal;
}
```

### 声明

declare 声明全局变量


类型保护

当变量的类型有多个时 可以用类型保护来选择类型 使用typeof instanceof确认类型 
```ts
let val: number | string
if (typeof val === 'string') {
  console.log(val.length)
} else {
  console.log(val.toFixed())
}
```

## w

=d7--1017=

### 装饰器

装饰器主要依赖于 Object.defineProperty
Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象

#### 语法
Object.defineProperty(obj, prop, descriptor)
obj：要在其上定义属性的对象。
prop：要定义或修改的属性的名称。
descriptor：将被定义或修改的属性描述符。
返回值：被传递给函数的对象。

#### 属性描述符

对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。

数据描述符是一个具有值的属性，该值可能是可写的，也可能不是可写的。
存取描述符是由 getter-setter 函数对描述的属性。
描述符必须是这两种形式之一；不能同时是两者。

数据描述符和存取描述符均具有以下可选键值：

  configurable: 当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 false。
  enumerable

  enumerable: 定义了对象的属性是否可以在 for...in 循环和 Object.keys() 中被枚举。
  当且仅当该属性的 enumerable 为 true 时，该属性才能够出现在对象的枚举属性中。默认为 false。

数据描述符同时具有以下可选键值：

  value: 该属性对应的值。可以是任何有效的 JavaScript 值(数值，对象，函数等)。默认为 undefined

  writable: 当且仅当该属性的 writable 为 true 时，value 才能被赋值运算符改变。默认为 false。

存取描述符同时具有以下可选键值：

  get: 一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。该方法返回值被用作属性值。默认为 undefined。

  set: 一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。默认为 undefined

如果一个描述符不具有value,writable,get 和 set 任意一个关键字，那么它将被认为是一个数据描述符。如果一个描述符同时有(value或writable)和(get或set)关键字，将会产生一个异常。

1. 在tsconfig.json 打开装饰器的开关 "experimentalDecorators": true
```ts
{
  "compilerOptions": {
    "target": "esnext",
    "experimentalDecorators": true
  }
}
```

#### 装饰器类型
类装饰器，方法装饰器，访问器装饰器，属性装饰器, 参数修饰器

类装饰器，方法装饰器，访问器装饰器参数
target: 所装饰的目标类
propertyName: 所装饰类/方法/访问器的名字
descriptor: 描述符

属性装饰器参数
target: 所装饰的目标类
propertyName: 所装饰属性的名字

参数装饰器参数
target: 所装饰的目标类
propertyName: 所装饰参数的名字
index: 所在方法中的第几个参数 从0开始

方法装饰器
```ts
function log(value: boolean): any {
  return (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor
  ) => {
    console.log(target, propertyName, descriptor);
    return {
      value: () => {
        return 'not value';
      },
    };
  };
}
class ClassA {
  constructor(public age: number) {}
  @log(false)
  public getAge() {
    return this.age;
  }
}
const classA = new ClassA(1);
```

访问器装饰器
```ts
function logGS(
  target: any,
  propertyName: string,
  descriptor: PropertyDescriptor
) {
  console.log(target, propertyName, descriptor);
}
class ClassGS {
  private _age: number;
  constructor(age) {
    this._age = age;
  }
  @logGS
  get age() {
    return this._age;
  }
  set age(age) {
    this._age = age;
  }
}

const classgs = new ClassGS(1);
classgs.age = 3;
console.log(classgs.age);
```
属性装饰器
验证类是否声明了某个属性
有两个参数
```ts
function logP(
  target: any,
  propertyName: string,
) {
  console.log(target, propertyName);
}
class ClassP {
  @logP
  public age: number;
}
```

参数装饰器
```ts
function required(target: any, propertyName: string, index: number) {
  console.log(`修饰的是${propertyName}的第${index}个参数`);
}

class ClassI {
  public name: string = 'h';
  public age: number = 0;
  public getItem(prefix: string, @required infoType: string) {
    return prefix + ' ' + this[infoType];
  }
}
const classi = new ClassI();
classi.getItem('new', 'age');
```

## w

=d1--1018=

### 联合类型
```ts
let common: string | number = 1;
common = 'a';
```

### keyof
将一个类型的属性名全部提取出来当做联合类型

```ts
type PersonKey = keyof Person;
const p1: PersonKey = 'age';
const p2: keyof Person = 'name';
const p2: keyof Person = 'height';
// 不能将类型"height"分配给"age | name"
```

### Record
用于映射

```ts
// 1. 定义一个普通的对象类型
type Obj = Record<string, any>
// 相等于声明
// type Obj = {
//   [val: string]: any
// }

// 2. 搭配联合类型用法
tpye RecordMethods = 'GET' | 'POST' | 'PUT'
type MethodsAny = Record<RecordMethods, any>
// 相当于
// type MethodsAny = {
//   GET: any
//   POST: any
//   PUT: any
// }

// 3. 映射对象 将对象的每个属性都是拥有特定键值对的类型
interface PersonModel {
  name: string
  age: number
}

type PersonM = Record<string, PersonModel>
// 相当于
// type PersonM = {
//   [val: string]: PersonModel
// }

```

### Partial(部分,可选)
让一个类型中的属性都变成可选参数

```ts
interface Person {
  name: string;
  age: number;
}
type PartPerson = Partial<Person>
```

#### 实现原理

```ts
type Partial<T> = {
  [P in keyof T]?: T[P]
}
```

### Required(必选)
与Partial相反，将一个类型中的属性都变成必选参数

```ts
interface Person {
  name: string;
  age: number;
}
type RequiredPerson = Required<Person>
```

#### 实现原理
在?之前加个-，代表着这个属性是必须的

```ts
type Required<T> = {
  [P in keyof T]-?: T[P]
}
```

### Pick(选择)
选择一个原来的接口中一部分的属性定义

```ts
interface Person {
  name: string;
  age: number;
}
type PickPerson = Pick<Person, 'name' | 'age'>
```

#### 实现原理

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

### Readonly(只读)
让一个定义中的所有属性都变成只读参数

### Exclude(排除)
排除 联合类型 中一部分的内容

```ts
type Size = 'large' | 'middle' | 'small'
type NoMSize = Exclude<Size, 'middle'>
```

#### 实现原理
传入两个泛型

我们这里用 Size 也就是 'large' | 'middle' | 'small' 去代表 T
用 'middle' 属性去代表第二个泛型 U
T extends U 就判断是否 'large' | 'middle' | 'small' 有 middle， 有middle就返回never,就代表将其排除

```ts
type Exclude<T, U> = T extends U ? never : T
```

### Omit (省略的)
将接口或者类型的键值对删除一部分
和Pick相反

```ts
interface Person {
  name: string;
  age: number;
}
type PickPerson = Omit<Person, 'name'>
```

#### 实现原理

```ts
type Omit<T, K extends string | number | symbol> = {
  [P in Exclude<keyof T, K>]: T[P]
}
```

# 2023

## w

=d4-0223=

### 判断入参的类型

基本类型的参数可以使用 **typeof**
除了 null 都可以识别出来

```ts
const a: number = 1  
typeof a === string  // string
```

引用数据类型的，如果有构造函数，类可以通过 instanceof 来判断

没有的话可以用 *as* 辅助判断  
```ts
// 通过泛型定义通用类型保护函数
function isOfType<T>(
  target: unknown,
  prop: keyof T
): target is T {
  return (target as T)[prop] !== undefined;
}
```