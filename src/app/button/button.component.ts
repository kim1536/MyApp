import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input()
  text: string =''

  @Output()
  clickEvent: EventEmitter<string> = new EventEmitter(); 

  constructor() { }

  ngOnInit(): void {
  }

  clickButton() {
    this.clickEvent.emit(undefined);
  }

  
}
