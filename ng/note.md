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
if else

```html
<div *ngIf="flag; else noFlag">flag true</div>
<ng-template #noFlag>flag false</ng-template>
```

\*ngFor="let val of arr;let i = index"  
val 为数据  
i 为索引

[ngStyle]="{}"  
[ngClass] ="{}"

### cli 指令创建组件

> ng g c list --skip-tests

在 app 文件夹下创建 list 组件文件夹

**--skip-tests**  
不生成测试文件

> ng g c list/detail --skip-tests

在 list 文件夹下创建 detail 组件文件夹

### model

xx.model.ts
创建一个实体类
没有特殊意义

### 组件传值

- 子组件  
  **@Input**  
  自定义属性装饰器

```ts
// app-child
import {Input} from '@angular/core'
// ...
@Input()
age: number;
// ...
```

- 父组件

```html
<app-child [age]="12" />
```

#### 自定义属性别名

装饰器可以传入一个别名，父组件传入是使用的名称应该是这个别名

- 子组件

```ts
// ...
@Input('stuAge')
age: number;
// ...
```

- 父组件

```html
<app-child [stuAge]="12" />
```

### 自定义事件绑定

**@Output**

- 子组件

```ts
// app-child
import { EventEmitter, Output } from '@angular/core'
// ...
@Output()
customFn = new EventEmitter<{name: string, age: number}>()

onClick() {
  this.customFn.emit({name: 'jack', age: 16})
}
// ...
```

- 父组件

```html
<!-- ... -->
<app-child (customFn)="fn($event)" />
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
  // ...
  encapsulation: ViewEncapsulation.None
})
// ...
```

### 本地引用 （local references）

#### 模版引用变量

在 element 上使用#声明模版引用变量，其他位置可以使用这个变量，得到这个属性对于的 element 元素

```html
<input #iptRef /> <button (click)="onSubmit(iptRef)">提交</button>
```

```ts
// ...
onSubmit(val: any) {
  console.log(val) // <input />
}
// ...
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
// ...
@ViewChild('iptRef')
iptRef;
// 组件上使用模版引用变量
@ViewChild('appChild')
child1;
// 直接引入组件
@ViewChild(ChildComponent)
child1;
onSubmit() {
  console.log(this.iptRef);
}
// ...
```

## w

=d1--1030=

### 插槽

**ng-content:**  
ng 标记自定义内容放在 html 的位置

### 生命周期

**ngOnChanges:**  
@Input 修饰的变量改变时触发，即 properties  
参数：与修改变量相关的数据对象

**ngOnInit:**  
ng 组件初始化后触发，在 constructor 方法执行后

**ngDoCheck:**

1. 在状态发生变化，Angular 自己本身不能捕获这个变化时会触发 NgDoCheck。  
   在以下情况会触发  
   1.1 组件的 @Input() 引用发生变化。  
   1.2 组件的 DOM 事件，包括它子组件的 DOM 事件，比如 click、submit、mouse down 等事件。  
   1.3 Observable 订阅事件，同时设置 Async pipe。  
   1.4ChangeDetectorRef.detectChanges()、ChangeDetectorRef.markForCheck()、ApplicationRef.tick()，手动调用这三种方式触发变化检测。

2. 每次变化检测以后，都会触发 ngDoCheck 钩子函数，紧跟在 ngOnChanges 和 ngOnInit 之后运行。

**AfterViewInit:**  
模版还初始化完成后触发，在该方法之前的钩子函数，无法获取到 ref

### @ContentChild

获取 ng-content 中的元素，使用方法和 ViewChild 一致

子组件

```html
<ng-content></ng-content>
```

```ts
import { ContentChild } from '@angular/core'
// ...
@ContentChild('iptRef')
iptRef;
// ...
```

父组件

```html
<app-child>
  <input #iptRef />
</app-child>
```

=d2--1031=

### 自定义 ng 指令

ng 允许自定义指令扩展指令功能

**方法：**

1. 创建文件  
   1.1 手动创建带 .directive.ts 的文件  
   文件需要在 .module.ts 文件上声明，ng 才能识别

   ```ts
   // app.module.ts
   import { BtHighlightDirective } from './directive/bt-highlight.directive';
   @NgModule({
     declarations: [
       BtHighlightDirective
     ]
     // ...
   })
   // ...
   ```

   1.2 cli 指令生成

   > ng g d [文件名] --skip-tests

   指令执行后，会自动在 module 中声明指令

2. 编写

   2.1 直接在元素上进行修改  
   ps: 不建议该方法，在其他平台可能不通用

   ```ts
   // click.directive.ts
   // ...
   @Directive({
     selector: "[appClick]",
   })
   export class ClickDirective implements OnInit {
     constructor(private elRef: ElementRef) {}
     ngOnInit(): void {
       this.elRef.nativeElement.style.color = "blue";
     }
   }
   ```

   2.2 通过调用 renderer 方法修改

   ```ts
   // ...
   export class ClickDirective implements OnInit {
     constructor(private elRef: ElementRef, private renderer: Renderer2) {}
     ngOnInit(): void {
       this.renderer.setStyle(this.elRef.nativeElement, "color", "blue");
     }
   }
   ```

3. 使用
   在元素写上该自定义指令的 selector 名称
   自定义指令

   ```ts
   // ...
   selector: "[appClick]";
   // ...
   ```

   ```html
   <div appClick></div>
   ```

4. 触发节点  
   **@HostListener:**  
   通过该装饰器，传入对应事件名，实现在对应事件触发时执行方法

   ```ts
   // ...
   // 点击后触发
   @HostListener('click') onClick(e: Event) {
    alert('clicked')
   }
   // ...
   ```

5. 属性装饰器  
    **@HostBinding:**  
    用于把一个 DOM 属性标记为绑定到宿主的属性，并提供配置元数据

   ```ts
   @Directive({
     selector: "[appBtHighlight]",
   })
   export class BtHighlightDirective implements OnInit {
     constructor(private elRef: ElementRef, private renderer: Renderer2) {}
     ngOnInit(): void {}

     @HostBinding("style.color") color: string = "black";
     @HostListener("mouseenter") mouseover(e: Event) {
       this.color = "blue";
       // 鼠标移入字体颜色变为蓝色
     }
   }
   ```

6. 指令增加变量  
   允许元素输入变量

   完整事例

   ```ts
   import {
     Directive,
     ElementRef,
     HostBinding,
     HostListener,
     Input,
     OnInit,
     Renderer2,
   } from "@angular/core";

   @Directive({
     selector: "[appBtHighlight]",
   })
   export class BtHighlightDirective implements OnInit {
     constructor(private elRef: ElementRef, private renderer: Renderer2) {}
     ngOnInit(): void {}
     @Input() defColor: string = "black";
     @Input() actColor: string = "blue";
     @HostBinding("style.color") color: string = "black";
     @HostListener("mouseenter") mouseover(e: Event) {
       this.color = this.actColor;
     }
     @HostListener("mouseleave") mouseleave(e: Event) {
       this.color = this.defColor;
     }
   }
   ```

   使用

   ```html
   <h1 appBtHighlight [defColor]="'#ccc'" [actColor]="red">高亮</h1>
   ```

7. **指令扩展**
   HostListener 判断点击节点

```ts
import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from "@angular/core";

@Directive({
  selector: "[appDropdown]",
})
export class DropdownDirective {
  @HostBinding("class.open") isOpen = false;

  @HostListener("document:click", ["$event"]) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }
  constructor(private elRef: ElementRef) {}
}
```

### 自定义结构指令

结构指令指需要使用\*来修饰的指令  
比如 ngIf，ngFor

和自定义指令相同，

定义

```ts
import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[appUnless]",
})
export class UnlessDirective {
  @Input()
  set appUnless(flag: boolean) {
    if (!flag) {
      this.vcRef.createEmbeddedView(this.tempRef);
    } else {
      this.vcRef.clear();
    }
  }
  /**
   *
   * @param tempRef 模版
   * @param vcRef 视图容器
   */
  constructor(
    private tempRef: TemplateRef<any>,
    private vcRef: ViewContainerRef
  ) {}
}
```

使用

```html
<!-- 只显示第一个 -->
<div *appUnless="false">false显示</div>
<div *appUnless="true">true不显示</div>
```

### ngSwitch

```html
<div [ngSwitch]="4">
  <p *ngSwitchCase="1">1</p>
  <p *ngSwitchCase="2">2</p>
  <p *ngSwitchCase="3">3</p>
  <p *ngSwitchCase="4">4</p>
  <p ngSwitchDefault>default</p>
</div>
```

=d3--1101=

### service

父组件注入 service 后，**子组件也可以使用到该 service 的实例**，只要声明好变量即可  
如果子组件不想要用父组件的实例，可以给再次注入一个同名实例，新实例会**覆盖**掉继承的实例

1. 创建 class

   ```ts
   // log.service.ts
   export default LogService {
    log(text) {
      console.log('output', text)
    }
   }
   ```

2. 使用

   ```ts
   // ...
   @Component({
    // ...
    providers: [LogService]
   })
   // ...
   constructor(private logService: LogService) {}
   ngOnInit() {
    this.log(111)
   }
   // ...
   ```

   或者使用 inject 方法注入

   ```ts
   import { Component, Input, Output, inject } from '@angular/core';
   // ...
   private logService: LogService

   constructor() {
    this.logService = inject(LogService)
   }
   // ...
   ```

#### service 注入 service

给需要注入的 service 加上 **@Injectable**

```ts
import BService from './b.service.ts'
@Injectable()
export AService {
  constructor(private bService: BService) {}
  onClick() {
    this.bService.b()
  }
}
```

此时 aService 可以使用 bService 的方法

#### 利用 service 进行跨组件通信

在 2 个组件的共同父组件注入 service  
service 使用 EventEmitter 实例化一个对象
发送组件执行 emit()方法  
接收组件实现 subscribe()方法

```ts
// emit.service.ts
export class EmitService {
  myEmit = new EventEmitter<string>();
}
```

发送组件

```ts
// ...
onClick() {
  this.emitService.myEmit.emit('12')
}
// ...
```

接收组件

```ts
// ...
constructor(private emitService: EmitService) {
  this.emitService.myService.subscribe((val: string) => {
    console.log(val)
  })
}
// ...
```

### 路由

```ts
// app.module.ts
// ...
const routes: Routes = [
  {path: '', component: 'xxx'}
]
@Module({
  // ...
  imports: [
    // ...
    Routers.forRoot(routes)
  ]
})
```

```html
<root-outlet />
```

#### routerLink 指令

添加 routerLink 指令后，点击会跳转到路由定义页面

```html
<a routerLink="/page"></a>
```

路由可以是相对路径和绝对路径，绝对路径不会有
问题，  
相对路径是基于当前路径  
以下是例子

```html
<!-- /page -->
<a routerLink="page"></a>
```

点击后，会跳转到/page/page，而不是/page

可以使用.,/字符

```html
<!-- /page -->
<a routerLink="../page"></a>
<!-- 跳转到/page -->
<a routerLink="./page"></a>
<!-- 跳转到/page/page -->
```

#### routerLinkActive

激活类  
处于对应页面上，参数 class 会激活

#### routerLinkActiveOptions

入参类型：对象

#### 编程式路由

```ts
// 路由对象，当前路由信息
import { Router, ActiveRoute } from '@angular/router'
constructor(private router: Router, private route: ActiveRoute) {

}
openPage() {
  this.router.navigate(['/newPage'])
}
```

使用相对路径

> this.router.navigate(['new-page'], {relativeTo: this.route})

#### 动态路由

获取动态路由参数

```ts
// /user/:id/:name
this.route.snapshot.params.id;
this.route.snapshot.params.name;
```

订阅 路由 params 的变化

> this.route.params.subscribe((params) => {})

#### query

标签式  
增加 queryParams 入参类型为对象

跳转到 /list/1?age=2

```html
<div [routerLink]="['/list', '1']" [queryParams]="{age: 2}"></div>
```

编程式

```ts
this.router.navigate(["/list", "1"], { queryParams: { age: 2 } });
```

=d5--1103=

'\*\*': 匹配所有路由，一般用于 404
redirectTo: 路由重定向

> { path: '\*\*', redirectTo: '/404'}

**queryParamsHandling**  
指定在路由时应如何处理查询参数  
类型  
'merge': 默认值，新query会和已有的query**合并**  
'preserve': **保留**已有的query，并且不会增加新的参数  
'': 空值，用新query**替换**已有的query

```ts
// 当前路由/list/1?age=2
this.router.navigate(['edit'], { redirectTo: this.route, queryParamsHandling: 'preserve'})
// 跳转到/list/1/edit?age=2
```

### 路由守卫

## w

=d5-1215=

### ng 环境变量配置

**场景**  
angular：16

- 创建环境变量文件

src/environments/environment.ts  
src/environments/environment.prod.ts

```ts

export const environment = {
  production: false,
  loginUrl: `https://sit.app.com`
}

```

属性：  
production: 是否需要压缩  
其他自定义属性  

- 应用

```ts
import { environment } from '@/environments/environment';
console.log(environment.loginUrl)
```

文件替换
在angular.json 文件需要对环境变量文件进行替换

```json
// ...
"configurations": {
  "development": {
    "fileReplacements": [
        {
          "replace": "src/environments/environment.ts",
          "with": "src/environments/environment.development.ts"
        }
      ],
// ...
```

这意味着在使用development配置打开时，  
environment.ts文件会替换成environment.development.ts
可以根据需要配置不同的环境变量进行替换  

执行脚本命令
> ng build --configuration development
