# 2023

## w

=d4-1026=

### NgModule 装饰器

参数 **declarations**：  
创建的组件需要在这里声明，ng 才能识别到他是程序的一部分

### Component 装饰器

selector  
ng 的选择器， ng 能够识别到在应用的位置  
可以像 CSS 选择器一样

1. 按元素类型声明  
   selector: 'app-con'

   ```html
   <app-con />
   ```

2. 按属性声明  
   selector: '[app-con]'

   ```html
   <div app-con></div>
   ```

3. 按类选择器声明  
   selector: '.app-con'
   ```html
   <div class="app-con"></div>
   ```

最好使用元素的方式去声明

### data binding

{{val}}

### property binding

[disabled]="true"

### event binding

(click)="fn($event)"

### directive

修改 dom 的指令使用\*  
比如 ngIf, ngFor

\*ng-if

\*ngFor="let val of arr;let i = index"  
val 为数据  
i 为索引

[ngStyle]="{}"  
[ngClass] ="{}"

### ng 指令创建组件

> ng g c list --spec false  
> 在 app 文件夹下创建 list 组件文件夹

**--spec false**
不生成测试文件

> ng g c list/detail --spec false  
> 在 list 文件夹下创建 detail 组件文件夹

### model

xx.model.ts
创建一个公共类

### 组件传值

- 子组件  
  给自定义属性加上装饰器

```ts
// app-child
import {Input} from '@angular/core'
//
@Input()
age: number;
//
```

- 父组件

```html
<app-child [age]="12" />
```

#### 自定义属性别名

装饰器可以传入一个别名，父组件传入是使用的名称应该是这个别名

- 子组件

```ts
@Input('stuAge')
age: number;
```

- 父组件

```html
<app-child [stuAge]="12" />
```

### 自定义事件绑定

- 子组件

```ts
// app-child
import { EventEmitter, Output } from '@angular/core'
//
@Output()
customFn = new EventEmitter<{name: string, age: number}>()

onClick() {
  this.customFn.emit({name: 'jack', age: 16})
}
```

- 父组件

```html
<!--  -->
<app-child (customFn)="fn" />
```

#### 事件别名

依旧是是在装饰器中加入参数，父组件以这个参数传入

### encapsulation 封装性

限制组件样式只作用于内部，还是全局有效  
类似 vue 的 scoped

encapsulation 属于默认行为，如果需要关闭，在装饰器加上以下属性

```ts
import { ViewEncapsulation } from '@angular/core'

@Component({
  //
  encapsulation: ViewEncapsulation.None
})
//
```

### 本地引用 （local references）

#### 模版引用变量

在 element 上使用#声明模版引用变量，其他位置可以使用这个变量，得到这个属性对于的 element 元素

```html
<input #iptRef /> <button (click)="onSubmit(iptRef)">提交</button>
```

```ts
//
onSubmit(val: any) {
  console.log(val) // <input />
}
```

#### ViewChild

另一种实现本地引用的方法

**装饰器参数传入：**

1. 原生标签：传入元素使用#声明的属性名
2. 子组件：有多种方法

**获取值**  
与直接使用传入的模版引用变量不同，获取到的值是 ElementRef

```html
<input #iptRef />
<app-child #appChild />
<app-child />
```

```ts
import { ViewChild } from '@angular/core'
import ChildComponent from '/child/child.component'
//
@ViewChild('iptRef')
iptRef;
@ViewChild('appChild')
child1;
@ViewChild(ChildComponent)
child1
onSubmit() {
  console.log(this.iptRef)
}
```
