# 2023

# GT

## w

=1109-d4=

### ng g c 创建组件时，提示报错

**简述**  
使用以下命令创建组件

> ng g c pages/income-projector/ip-input-number --skip-tests

报错如下  
<font color=#c66>More than one module matches. Use the '--skip-import' option to skip importing the component into the closest module or use the module option to specify a module.</font>

**原因**  
项目下有多个.module.ts 的文件存在，创建时无法确定将组件导入那个 module 中，因此要通过--module 来指定

> ng g c pages/income-projector/ip-input-number --module=app --skip-tests

## w

=1114-d2=

### ng 使用 subscribe 更新数据时，视图不更新

**简述**  
项目中有一个service.ts（后面简称service）， provide 到父组件使用，子组件使用service的属性并且用ngModel绑定，父组件直接展示属性  
service需要在子组件的值发生改变时执行一些操作  
因此使用 EventEmitter 来响应事件，在子组件的ngChange上触发emit，在父组件的ngAfterContentInit订阅  
当子组件修改属性，值发生改变，但是父组件的属性没有修改

**原因**  
当在 Angular 中使用 subscribe 函数时，如果不能更新视图，可能是因为 Angular 的变化检测机制对于非 Angular 管理的数据（例如从 Observable 订阅的数据）的更新不敏感。

**方法**  
使用 Angular 的 ChangeDetectorRef 类的 detectChanges 方法，该方法强制 Angular 检测数据的变化，并且更新视图。

```ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {
  data: any;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.getData().subscribe((data) => {
      this.data = data;
      this.cd.detectChanges();
    });
  }

  getData() {
    // ...
  }
}
```

## w

=d5-1208=

## 在加入拦截器后，报错

**错误**  
ERROR Error: NG0200: Circular dependency in DI detected for InjectionToken HTTP_INTERCEPTORS.  

**原因**  
httpClient 相互依赖了

**方法**
拦截器的constructor不要引入userService  

```ts
constructor(private injector: Injector) {
  }    
  intercept(req: HttpRequest, next: HttpHandler): Observable> {
   // try to call the service here.
    language: string = 'en';
    // 关键点
    const lanaguageInj= this.injector.get(CrossDomainService);
    const globalLanguage= auth.globalLanguage.subscribe((language) => {
      this.language = language;
    });
    const request = req.headers.has('Accept-Language') ?
      req :      
      req.clone({ setHeaders: { 'Accept-Language': this.language } });
    return next.handle(request);
  }
}
```

### input 获取不了焦点

**简述**  
版本：ng16 + ng-zorro  
点击按钮弹出弹窗，并且聚焦到弹窗的输入框上

**方法**

1. 直接在modal打开的回调方法调用输入框的focus方法，没有生效  
2. 使用事件监听的方法，在afterViewInit 订阅，  
open的回调方法上钓鱼事件监听，  
具体代码如下

```html
<nz-modal
  (nzAfterOpen)="onOpen()"
>
  <ng-container *nzModalContent>
    <nz-input-number
      #ipt
    />
  </ng-container>
</nz-modal>
```

```ts
export class ModalEditComponent implements AfterViewInit {
  focusEvt = new EventEmitter()

  @ViewChild('ipt')
  iptRef: any = null;

  ngAfterViewInit(): void {
    this.focusEvt.subscribe((() => {
      setTimeout(() => {
        this.iptRef.focus()
      })
    }))
  }
  onOpen() {
    this.focusEvt.emit()
  }
}

```

## w

=d1-1218=

### ng 报错 ngx Translate inside Library throws Circular Dependency error when used in HTTP_INTERCEPTOR

**场景**
angular: 16.2.0  
ngx-translate: 15.0.0  
ngx-translate/http-loader: 8.0.0

**简述**  
编写http拦截器，引入app.module.ts,ng报错

**原因**  
在拦截器的constructor注入了api类  
该api类是constructor实例了一个http封装类  
该http类，拦截器类都使用了 httpCLient  
可能引起了循环引用  
不能在constructor使用该api类  

**方法**  
拦截器类不在constructor赋值api类  
在使用到该api类的方法内部，使用Injector注入后使用

### ng 在设置iframe src是报错 unsafe value used in a resource URL context

**原因**  
ng对于外部链接资源做了安全限制  

**方法**  
可以通过引入DomSanitizer类包装url  

```ts
// ...
constructor(private sanitizer: DomSanitizer) {}
// ...
let safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url)
// ...
```

## w

=d4-1228=

### unit test 报错 Cannot match any routes. URL Segment: 'story'

**场景**  
angular: 16.2.0  

**简述**  
unit test有跳转的方法，执行方法时就开始报错

**方法**  

.ts

```ts
openPage() {
  this.routerSvc.navigate(
    '/story',
    {},
    {
      queryParams: { type: this._bannerItem.type },
    }
  );
}
```

需要在TestBed.configureTestingModule 的import加上模拟router

.spec.ts

```ts
// ...
beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [
      RouterTestingModule.withRoutes(
        [{path: 'story', component: StoryComponent}]
      ),
    ]
  }).compileComponents();
})
```
