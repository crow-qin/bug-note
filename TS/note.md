# 2021

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