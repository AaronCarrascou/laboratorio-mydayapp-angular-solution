import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from './services/iItems.interface';
import { ItemsStorageService } from './services/items-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  items:Item[]=[];
  changes:boolean=true;
  filter='all';

  constructor(
    private itemStorageService:ItemsStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    
    this.items = this.itemStorageService.get();

    this.setFilter();

  }

  addItem(event:any){
    console.log('antes',this.items);
    console.log('item', event);
    this.items = this.items.concat({
      title: event.title,
      completed:false
    });
    console.log('despues',this.items);

  }
  deleteItem(event:any){
    this.items.splice(event, 1);
    this.changes=!this.changes;
    this.setItems();
  }

  completeItem(event:any){
    this.items[event].completed=!this.items[event].completed;
    this.changes=!this.changes;
    this.setItems();
  }

  clearComplete(){
    console.log('se llamo a clar')
    for(let i=0; i<this.items.length; i++){
      if(this.items[i].completed){
        this.items.splice(i, 1);
        i--;
      }
    }

    this.setItems();
    
  }

  setItems(){
    this.itemStorageService.update(this.items);
  }

  addUpdatedItems(event:any){
    this.items=event;
    this.setItems();
  }

  setFilter(){
    this.route.params
    .subscribe(p => {
        this.filter = p['filter'] || 'all';
        this.changeFilter(p['filter']);
    })
  }

  changeFilter(event:any){
    
    if(event=='pending' || event=='completed' || event==''){
      this.filter=event;
      this.router.navigate([`/${event}`]);
    }else{
      this.filter='all';
      this.router.navigate([`/all`]);
    }

  }


}
