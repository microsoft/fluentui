import { findIndex } from '@fluentui/react/lib/Utilities';
import { TodoItemData, DataProviderApi } from './types/index';

const LOAD_DELAY = 500;

/**
 * Class used to maintain the client side data.
 */
export class DataProvider implements DataProviderApi {
  private _items: TodoItemData[];
  private _isLoading: boolean;
  private _listeners: Array<() => void>;
  private _generateId: () => string;

  /**
   * Current items tracked by the provider.
   */
  public get items(): TodoItemData[] {
    return this._items;
  }
  public set items(value: TodoItemData[]) {
    this._items = value;
    if (this.isLoading) {
      this._isLoading = false;
    }
    this._emitChange();
  }

  /**
   * Whether there is an unfinished "server request" currently.
   */
  public get isLoading(): boolean {
    return this._isLoading;
  }

  /**
   * @param items Initial items (will be "loaded" after a delay)
   * @param generateId Customize ID generation, mainly for test purposes
   */
  constructor(items?: TodoItemData[], generateId?: () => string) {
    this._generateId = generateId || _generateGuid;
    this._listeners = [];
    this._items = [];

    if (items) {
      this._isLoading = true;
      setTimeout(() => {
        this._items = items;
        this._isLoading = false;
        this._emitChange();
      }, LOAD_DELAY);
    } else {
      this._isLoading = false;
    }
  }

  /**
   * Create a new item and add it to the list.
   */
  public createItem = (title: string): Promise<TodoItemData[]> => {
    this._setIsLoading(true);

    return new Promise<TodoItemData[]>(resolve => {
      const newItem: TodoItemData = {
        id: this._generateId(),
        title: title,
        isComplete: false,
      };

      setTimeout(() => {
        // don't mutate the original array
        this.items = [...this.items, newItem];
        resolve(this.items);
      }, LOAD_DELAY);
    });
  };

  /**
   * Delete an item from the list.
   */
  public deleteItem = (delItem: TodoItemData): Promise<TodoItemData[]> => {
    return new Promise<TodoItemData[]>((resolve, reject) => {
      setTimeout(() => {
        const index = findIndex(this.items, (current: TodoItemData) => current.id === delItem.id);
        if (index !== -1) {
          // don't mutate the original array
          const newItems = [...this.items];
          newItems.splice(index, 1);
          this.items = newItems;
          resolve(this.items);
        } else {
          reject(new Error(`Item id "${delItem.id}" can't be deleted because it doesn't exist.`));
        }
      }, LOAD_DELAY);
    });
  };

  /**
   * Toggle the complete state of an item.
   */
  public toggleComplete = (item: TodoItemData): Promise<TodoItemData[]> => {
    // don't mutate the original item or array
    const newItem = { ...item, isComplete: !item.isComplete };

    return new Promise<TodoItemData[]>((resolve, reject) => {
      const index: number = findIndex(this.items, (current: TodoItemData) => current.id === newItem.id);
      if (index !== -1) {
        const newItems = [...this.items];
        newItems[index] = newItem;
        this.items = newItems;
        resolve(this.items);
      } else {
        reject(new Error(`Item id "${item.id}" can't be completed because it doesn't exist.`));
      }
    });
  };

  /**
   * Add listener to the provider.
   *
   * Once the store has a change of state and emits that change, the listeners will be called.
   * You must remove the listener by calling removeListener when you are not going to use it anymore.
   */
  public addListener(listener: () => void): void {
    this._listeners.push(listener);
  }

  /**
   * Remove the registered listener.
   */
  public removeListener(listener: () => void): void {
    const listenerIdx: number = this._listeners.indexOf(listener);
    if (listenerIdx > -1) {
      this._listeners.splice(listenerIdx, 1);
    }
  }

  private _setIsLoading(value: boolean) {
    this._isLoading = value;
    this._emitChange();
  }

  /**
   * Emit the changes in the store to all listeners.
   */
  private _emitChange(): void {
    this._listeners.forEach((listener: () => void) => listener());
  }
}

function _generateGuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0;
    // eslint-disable-next-line no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8;

    return v.toString(16);
  });
}
