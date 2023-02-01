import { Injectable } from '@angular/core';
import { Item } from './iItems.interface';


@Injectable({
  providedIn: 'root'
})
export class ItemsStorageService {

  private storageKey = 'mydayapp-angular';

  constructor() {}

  get(): Item[]{
    const items = localStorage.getItem(this.storageKey);
    return items ? JSON.parse(items) : [];
  }

  update(items: Item[]): void {
    //console.log('update', items)
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

}