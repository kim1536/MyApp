import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PersonComponent } from './person.component';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ PersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should click Set button',  () => {
    fixture.detectChanges();
    let buttonElement = fixture.debugElement.query(By.css('.set-button'));
    let p = fixture.debugElement.nativeElement.querySelector('p');

    buttonElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.personName).toBe('Mahesh');
      expect(p.textContent).toBe('Mahesh');
    });
  });

  it('should click Send button with waitForAsync', () => {
    let buttonElement = fixture.debugElement.query(By.css('.send-button'));
    
    spyOn(component, 'sendData');
    //Trigger click event after spyOn
    buttonElement.triggerEventHandler('click', null);

    fixture.whenStable().then(() => {
      expect(component.sendData).toHaveBeenCalled();
    });
  });  

  it('should click Send button with fakeAsync', fakeAsync(() => {
    let buttonElement = fixture.debugElement.query(By.css('.send-button'));
    
    spyOn(component, 'sendData');
    //Trigger click event after spyOn
    buttonElement.triggerEventHandler('click', null);
    
    tick();
    expect(component.sendData).toHaveBeenCalled();
  }));   

  it('should click Edit button', fakeAsync(() => {
    let buttonElement = fixture.debugElement.query(By.css('.edit-button'));
    
    spyOn(component, 'editPerson');
    //Trigger click event after spyOn
    buttonElement.triggerEventHandler('click', null);
    
    tick();
    expect(component.editPerson).toHaveBeenCalled();
  }));  
}); 