import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../../services/iItems.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnChanges {

  itemsLeft:number=0;

  @Input() items:Item[]=[];
  @Input() filter='';
  @Input() changes;
  @Output() clearCompleteEvent = new EventEmitter<any>();
  @Output() changeFilterEvent = new EventEmitter<any>();

  constructor(
  ) { 
    this.changes=true;
  }

  ngOnChanges(simple: SimpleChanges): void {
    console.log('algo cambio')
    this.setItemsLeft();
  }

  ngOnInit(): void {
    this.setItemsLeft();
  }

  setItemsLeft(){
    this.itemsLeft=0;
    this.items.forEach(item => {
      if(!item.completed){
        this.itemsLeft++;
      }
    });
  }

}
