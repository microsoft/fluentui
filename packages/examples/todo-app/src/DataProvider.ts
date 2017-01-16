import update = require('immutability-helper');
import { Promise } from 'es6-promise';
import { findIndex } from 'office-ui-fabric-react/lib/Utilities';
import { ITodoItem, IDataProvider } from './types/index';

const ADD_ITEMS_DELAY = 500;

/**
 * DataProvider the class used to maintain the client side data.
 *
 * It interact with data provider to sync data items with sharepoint list.
 * It also maintain the loading state to tell React Component once the action is
 * started of finished.
 */
export default class DataProvider implements IDataProvider {
  /**
   * The counter used to identify the latest server call.
   * If the current call is not the latest one, we don't want to update the list
   * to mess up with the out of date data with data in this store.
   */
  private _items: ITodoItem[];
  private _isLoading: boolean;
  private _listeners: Array<() => void>;

  /**
   * The items store in the local. It only contains the data recently fetched from server.
   */
  public get items(): Array<ITodoItem> { return this._items; }
  public set items(value: Array<ITodoItem>) {
    this._items = value;
    this._emitChange();
  }

  /**
   * Whether there is unfinished server request currently.
   */
  public get isLoading(): boolean { return this._isLoading; }
  public set isLoading(value: boolean) {
    this._isLoading = value;
    this._emitChange();
  }

  constructor() {
    this._items = [
      {
        id: '61b59681-2a82-4a51-b221-8c35e333ae89',
        title: 'Finish Sample Todo web part before dev kitchen',
        isComplete: false
      },
      {
        id: '94a844ae-0c6a-4820-8042-dbc386bdf930',
        title: 'Finish All the work in Todo web part before dev kitchen',
        isComplete: false
      },
      {
        id: '5fa55618-90f9-4b5f-b12d-60c9fb1fc7f0',
        title: 'SharePoint API investigation for Todo web part',
        isComplete: true
      },
      {
        id: '2ae54c74-1395-4a49-8dd2-4857efdd0e5e',
        title: 'Bug fixing of Pivot Control',
        isComplete: true
      }
    ];
    this._isLoading = false;

    this._listeners = [];
    this.createItem = this.createItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
  }

  /**
   * Create a new item and add it to the list through data provider.
   */
  public createItem(title: string): Promise<ITodoItem[]> {
    this.isLoading = true;

    return new Promise<ITodoItem[]>((resolve) => {
      const newItem: ITodoItem = {
        id: this._generateGuid(),
        title: title,
        isComplete: false
      };

      setTimeout(() => {
        this.items = this.items.concat(newItem);
        this.isLoading = false;
        resolve(this.items);
      }, ADD_ITEMS_DELAY);
    });
  }

  /**
   * Delete a item from the list through data provider.
   */
  public deleteItem(delItem: ITodoItem): Promise<ITodoItem[]> {
    return new Promise<ITodoItem[]>((resolve) => {
      this.items =
        this.items.filter((item: ITodoItem) => item.id !== delItem.id);
      resolve(this.items);
    });
  }

  /**
   * Toggle the complete state of an item by.
   *
   * Will call updateItem function to update complete state of this item.
   */
  public toggleComplete(item: ITodoItem): Promise<ITodoItem[]> {
    // Create a new Item in which the PercentComplete value has been changed.
    const newItem: ITodoItem = update(item, {
      isComplete: { $set: item.isComplete === true ? false : true }
    });

    return new Promise<ITodoItem[]>((resolve, reject) => {
      const index: number =
        findIndex(
          this.items,
          (item: ITodoItem) => item.id === newItem.id
        );
      if (index !== -1) {
        this.items[index] = newItem;
        this.items = this.items.slice(0);
        resolve(this.items);
      } else {
        reject(new Error(`Item to update doesn't exist.`));
      }
    });
  }

  /**
   * Add listener to the provider.
   *
   * Once the store has a change of state and emit that change, the listeners will be called.
   */
  public addListener(listener: () => void): void {
    this._listeners.push(listener);
  }

  /**
   * Remove the registered listener.
   *
   * You must remove the listener registered by addListener method when you are not going to use it anymore.
   */
  public removeListener(listener: () => void): void {
    const listenerIdx: number = this._listeners.indexOf(listener);
    if (listenerIdx > -1) {
      this._listeners.splice(listenerIdx, 1);
    }
  }

  /**
   * Emit the changes in the store to all listeners.
   */
  private _emitChange(): void {
    this._listeners.forEach((listener: () => void) => listener());
  }

  private _generateGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
