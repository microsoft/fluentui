import * as React from 'react';
import { Pivot, PivotItem, FocusZone, FocusZoneDirection, List, IListProps, KeyCodes } from '@fluentui/react';
import { TodoItem } from './TodoItem';
import { TodoItemData } from '../types/index';

import { tabsStyles } from './styles';
import strings from './../strings';

export interface TodoTabsProps {
  /**
   * The items rendered in the todo list.
   * They will be filtered and displayed on the appropriate pivots based on completed status.
   */
  items: TodoItemData[];

  /**
   * Callback for when an item's checkbox is checked or unchecekd.
   * @param item - item for which the checkbox is checked or unchecked.
   */
  onToggleComplete: (item: TodoItemData) => void;

  /**
   * Callback for when an item is deleted.
   * @param item - item for which the delete button is triggered.
   */
  onDeleteItem: (item: TodoItemData) => void;
}

export const TodoTabs: React.FunctionComponent<TodoTabsProps> = props => {
  const { items, onDeleteItem, onToggleComplete } = props;

  const onRenderItem = React.useCallback(
    (item?: TodoItemData) => {
      return item ? (
        <TodoItem key={item.id} item={item} onToggleComplete={onToggleComplete} onDeleteItem={onDeleteItem} />
      ) : null;
    },
    [onDeleteItem, onToggleComplete],
  );

  if (items.length === 0) {
    return null;
  }

  const activeTasks: TodoItemData[] = items.filter(task => !task.isComplete);
  const completedTasks: TodoItemData[] = items.filter(task => task.isComplete);
  const allTasks: TodoItemData[] = activeTasks.concat(completedTasks);

  return (
    <div className={tabsStyles.todoPivot}>
      <Pivot>
        {_renderPivotItemList(activeTasks, strings.active, onRenderItem)}
        {_renderPivotItemList(completedTasks, strings.completed, onRenderItem)}
        {_renderPivotItemList(allTasks, strings.allTasks, onRenderItem)}
      </Pivot>
    </div>
  );
};
TodoTabs.displayName = 'TodoTabs';

function _renderPivotItemList(
  tasks: TodoItemData[],
  tabName: string,
  onRenderItem: IListProps<TodoItemData>['onRenderCell'],
): React.ReactNode {
  return (
    <PivotItem headerText={`${tabName} (${tasks.length})`}>
      <FocusZone direction={FocusZoneDirection.vertical} isInnerZoneKeystroke={_isInnerZoneKeystroke}>
        <List className={tabsStyles.todoList} items={tasks} onRenderCell={onRenderItem} />
      </FocusZone>
    </PivotItem>
  );
}

function _isInnerZoneKeystroke(ev: React.KeyboardEvent<HTMLElement>): boolean {
  // eslint-disable-next-line deprecation/deprecation
  return ev.which === KeyCodes.right;
}
