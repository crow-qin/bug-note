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
