import { TodoItemData } from './index';

/**
 * The data provider interface.
 */
export interface DataProviderApi {
  isLoading: boolean;

  items: TodoItemData[];

  /**
   * Create an item and fetch the new list of items.
   * @param title - title of item that will be created.
   */
  createItem(title: string): Promise<TodoItemData[]>;

  /**
   * Update an item and fetch the new list of items.
   * @param itemUpdated - item which will be updated.
   */
  toggleComplete(itemUpdated: TodoItemData): Promise<TodoItemData[]>;

  /**
   * Delete an item and fetch the new list of items.
   * @param itemDeleted - item which will be deleted.
   */
  deleteItem(itemDeleted: TodoItemData): Promise<TodoItemData[]>;

  addListener(listener: () => void): void;

  removeListener(listener: () => void): void;
}
