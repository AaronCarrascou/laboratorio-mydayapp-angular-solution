import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Item } from '../../services/iItems.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  newItem:Item={
    title: '',
    completed: false
  }

  @Input() itemTitle='';

  @Output() newItemEvent = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {

  }

  addItem(){

    if(this.itemTitle!=''){
      this.newItem.title=this.itemTitle.trim();
      this.newItemEvent.emit(this.newItem);
      this.itemTitle='';
    }
    
  }
}
