/**
 * Data model for a todo task.
 */
export interface TodoItemData {
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
