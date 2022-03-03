import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed, fakeAsync, tick, async, } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('p要素のテキストがbutton works!であること', () => {
    const el = fixture.debugElement.query(By.css('p')).nativeElement; 
    expect(el.textContent).toBe('button works!'); 
  });

  it('受け渡されたテキストが設定されること', () => {
    component.text = 'Text input text';  // 1.変数への値設定
      fixture.detectChanges(); //
    const el = fixture.debugElement.query(By.css('span'))
      .nativeElement; // 2.HTML要素の取得
    expect(el.textContent).toBe(component.text); // 値の確認
  });

  it('ボタンクリック関数が親コンポーネントの関数を呼び出すこと', () => {
    // clickEventのスパイを作る。
    const spyObject = spyOn(component.clickEvent, 'emit');

    // テスト対象メソッドの実行
    component.clickButton();

   // スパイのメソッドが呼ばれた(toHaveBeenCalled)ことの確認
    expect(spyObject).toHaveBeenCalled();
  });

  it('ボタンクリックにより関数が実行されること', fakeAsync(() => {
    const spyObject = spyOn(component, 'clickButton'); //スパイの作成
    const el = fixture.debugElement.query(By.css('button')); // 1.要素の取得
    el.triggerEventHandler('click', null); // 2.イベント発火

    // fakeAsync 環境で非同期イベント待ちをシミュレート
    tick();
    expect(spyObject).toHaveBeenCalled(); //3.関数呼び出しの確認
  }));
});
