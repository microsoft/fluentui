import { ITodoItem } from './index';
/**
 * Props of TodoTabs component.
 */
export interface ITodoTabsProps {
  /**
   * The list items rendered in TodoTabs.
   * It will be filtered in each PivotItems by needs.
   */
  items: ITodoItem[];

  /**
   * onToggleComplete callback triggered when checkbox of one item is checked or unchecekd.
   *
   * @param {ITodoItem} item is the item in which the checkbox is checked or unchecked.
   */
  onToggleComplete: (item: ITodoItem) => void;

  /**
   * onDeleteItem callback triggered when delete of one item is triggered.
   *
   * @param {ITodoItem} item is the item in which the delete button is triggered.
   */
  onDeleteItem: (item: ITodoItem) => void;
}
