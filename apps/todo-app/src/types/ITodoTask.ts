/**
 * The interface of data modal for Todo task.
 */
export interface ITodoItem {
  /**
   * The ID of the todo item.
   */
  id: string;

  /**
   * The title of the todo item.
   */
  title: string;

  /**
   * The percent of the task that is completed.
   * In todo web part we use 0 to indicate task uncompleted and 1 to indicate task completed.
   */
  isComplete: boolean;
}

/**
 * The props for TodoItem component.
 */
export interface ITodoItemProps {
  /**
   * The current Todo item to be rendered.
   */
  item: ITodoItem;

  /**
   * onToggleComplete callback triggered when checkbox of this item is checked or unchecked.
   *
   * @param {ITodoItem} item is the item in which the checkbox is checked or unchecked.
   */
  onToggleComplete: (item: ITodoItem) => void;

  /**
   * onDeleteItem callback triggered when delete button of this item is triggered.
   *
   * @param {ITodoItem} item is the item in which the delete button is triggered.
   */
  onDeleteItem: (item: ITodoItem) => void;
}
