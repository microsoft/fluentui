import { ITodoItem, IDataProvider } from './index';
/**
 * Props for Todo component.
 */
export interface ITodoProps {
  /**
   * The dataProvider contains data storage and operations.
   */
  dataProvider: IDataProvider;
}

/**
 * State for Todo Component
 */
export interface ITodoState {
  /**
   * The tasks list items rendered in TodoTabs.
   * It will be filtered in each PivotItems by needs.
   */
  items: ITodoItem[];
}
