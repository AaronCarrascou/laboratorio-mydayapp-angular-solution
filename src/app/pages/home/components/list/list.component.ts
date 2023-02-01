import { Component, OnInit, Input, ViewChildren, ElementRef, QueryList, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Item, ItemEdited } from '../../services/iItems.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  
  itemEdited?: ItemEdited | null;
  itemEditedTitle:string='';

  @Input() filter='';
  @Input() items:Item[]=[];
  @Output() editItemEvent = new EventEmitter<any>();
  @Output() deleteItemEvent = new EventEmitter<any>();
  @Output() completeItemEvent = new EventEmitter<any>();
  @Output() changeItemsEvent = new EventEmitter<any>();

  @ViewChildren('inputEdit') inputEdit!: QueryList<ElementRef<HTMLInputElement>>;

  constructor(
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  editingItem(item: Item, index: number): void {
    this.itemEdited = {
      id: index,
      title: item.title,
      completed: item.completed,
    }

    this.cdRef.detectChanges();
    this.inputEdit.toArray()[index].nativeElement.focus();

    this.itemEditedTitle=this.itemEdited.title;
  }

  confirmEdition(index:any){
    const itemEdited = this.items[index];
    if(this.itemEditedTitle!=''){
      itemEdited.title = this.itemEditedTitle.trim();
      itemEdited.completed = itemEdited.completed;
      this.itemEdited = null;
      this.changeItemsEvent.emit(this.items);
    }

  }

  completeItem(index:any){
    this.completeItemEvent.emit(index);
  }
  
  deleteItem(index:any){
    this.deleteItemEvent.emit(index);
  }

  show(i:any):boolean{
    if(this.filter=='completed'){
      if(i.completed){
        return true;
      }
      
    }
    if(this.filter=='pending'){
      if(!i.completed){
        return true;
      }
      
    }
    if(this.filter=='all'){
      return true;   
    }
    return false;
  }



}
