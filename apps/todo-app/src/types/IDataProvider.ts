import { ITodoItem } from './index';
import { Promise } from 'es6-promise';

/**
 * The data provider interface implemented by MockTodoDataProvider and TodoDataProvider.
 */
export interface IDataProvider {

  isLoading: boolean;

  items: ITodoItem[];

  /**
   * createItem will send REST call to add an item in the current .
   * And it also fetch the newest version of list items to sync the current list.
   *
   * @param {string} title is the title of item that will be created in current list.
   */
  createItem(title: string): Promise<ITodoItem[]>;

  /**
   * updateItem will send REST call to update(merge) an item in the current list.
   * And it also fetch the newest version of list items to sync the current list.
   *
   * @param {ITodoItem} itemUpdated is the item which will be merged to current list.
   */
  toggleComplete(itemUpdated: ITodoItem): Promise<ITodoItem[]>;

  /**
   * deleteItem will send REST call to remove an item in the current list.
   * And it also fetch the newest version of list items to sync the current list.
   *
   * @param {ITodoItem} itemDeleted is the item which will be deleted in current list.
   */
  deleteItem(itemDeleted: ITodoItem): Promise<ITodoItem[]>;

  addListener(listener: () => void): void;

  removeListener(listener: () => void): void;
}