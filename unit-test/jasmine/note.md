# 2024

## w1

=d1-0129=

### jasmine 不执行单元测试

1. 在 describe 前加上 x, 即 xdescribe, 该 test suite 不会执行
2. 在 it 前加上 x, 即 xit, 则该测试会被跳过

### jasmine 只执行特定的单元测试

1. 在 describe 前加上 f, 即 fdescribe, 只会执行该 test suite, 其他 unit suites 会被跳过
2. 在 it 前加上 f, 即 fit, 则只会执行该测试

### 带 HTTP 请求的单元测试

- 请求成功

```ts
describe("service", () => {
  let testSvc: TestServices;
  let httpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // HttpClient的模拟请求模块
      import: [HttpClientTestingModule],
      providers: [TestServices],
    });
    testSvc = TestBed.inject(TestServices);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it("getList", () => {
    // 对方法进行订阅
    testSvc.getList().subscribe((val) => {
      // 对返回的数据进行断言
    });

    // 使用httpTestingController 进行模拟
    const req = httpTestingController.expectOne("/api/getList");
    // 断言api的请求方法
    expect(req.request.method).toEqual("GET");
    // 指定http模拟返回的数据
    req.flush({
      // ...
    });
  });
});
```

- 请求失败

```ts
// ...describe，beforeEach同上
it("getList: error", () => {
  // 对方法进行订阅
  testSvc.getList().subscribe({
    next: (val) => {
      // 对返回的数据进行断言
    },
    error: () => {
      // 对错误进行断言
    },
  });

  // 使用httpTestingController 进行模拟
  const req = httpTestingController.expectOne("/api/getList");
  // 断言api的请求方法
  expect(req.request.method).toEqual("GET");
  /**指定http模拟返回的数据
   * 第一个参数不为对象，即为返回报错
   * 第二个参数是错误信息
   */

  req.flush("get List error", {
    status: 500,
    statusText: "error",
  });
});
```

- 请求带参数

```ts
// 配置同请求成功
it("getLessons", () => {
  testSvc.getLessons(12).subscribe((data) => {
    // 断言
  });
  const req = httpTestingController.expectOne((res) => {
    return (res.url = "/api/getLessons");
  });
  expect(req.request.method).toEqual("GET");
  expect(req.request.params.get("queryName")).toEqual("");
  expect(req.request.params.get("pageSize")).toEqual(10);
  expect(req.request.params.get("pageNumber")).toEqual(1);

  req.flush({
    // ...
  });
});
```

### jasmine 测试 Angular 组件

```ts
describe("TestComponent", () => {
  // 组件实例
  let component: TestComponent;
  let fixture: any;
  // 可调试元素
  let el: DebugElement;
  // async方法异步默认等待5s结束
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // 可以把module导入，module已经声明了component
      imports: [TestModule],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        /**
         * 手动触发angular的变化监测机制
         * 同步执行
         *  */
        fixture.detectChanges();
      });
  }));

  it("should be create", () => {
    expect(component).toBeTruthy();
  });
  it("should create list", () => {
    component.list = [1, 2, 3];
    // 手动触发angular的变化监测机制
    fixture.detectChanges();
    const itemEls = el.query(By.css(".item"));
    expect(itemEls.length).toBe(3);
  });
});
```

- 测试带 Observable 的组件

组件为 TestComponent  
service 为 TestService

```ts
describe('TestComponent', () => {
  // 组件实例
  let component: TestComponent
  let fixture: any
  // 可调试元素
  let el: DebugElement
  let testSvc: TestService
  // async方法异步默认等待5s结束
  beforeEach(async(() => {
    const testSpy = jasmine.createSpyObj('TestService', ['findList'])
    TestBed.configureTestingModule({
      // 可以把module导入，module已经声明了component
      imports: [TestModule]，
      providers: [
        {
          provide: TestService,
          useValue: testSpy
        }
      ]
    }).compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(TestComponent)
      component = fixture.componentInstance
      el = fixture.debugElement
      testSvc = TestBed.inject(TestService)
    })
    it()
  }))
})
```

=d4-0201=

### 异步测试

1. 对于元素显示隐藏的，一般会引起 requestAnimationFrame 方法  
   requestAnimationFrame 是内置的异步渲染方法，如果同步使用 expect，expect 会立即执行，不会等到异步函数执行完后再执行

   可以使用 setTimeout 的方式，使得 expect 也能在 requestAnimationFrame 执行完后再执行  
   但是 it 函数是同步执行，需要使用参数 done，显式执行 done 方法，it 才算是结束

   ```ts

   // ...
   it('xx', (done; any) => {
     // 执行引起requestAnimationFrame的操作
     fixture.detectChanges()
     setTimeout(() => {
       expect().toBeTruthy()
       done()
     }, 500)
   })
   ```

2. 异步测试可能存在多个异步操作或嵌套操作，使用以上方式不一定能够解决
   可以使用fakeAsync方法，

```ts
let test = false
it('xx', fakeAsync(() => {
  setTimeout(() => {
    test = true
  }, 500)
  tick(500)
  expect().toBeTruthy()

}))
```

tick方法可以推进时间进程  
flush方法可以确保所有异步操作都执行完  
这样就可以在flush方法后面，再进行断言

flushMi