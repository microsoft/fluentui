import * as React from 'react';
import { Pivot, PivotItem, IPivotProps, PivotLinkSize } from 'office-ui-fabric-react/lib/Pivot';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { KeyCodes } from 'office-ui-fabric-react/lib/Utilities';
import TodoItem from './TodoItem';
import { ITodoItem, ITodoItemProps, ITodoTabsProps } from '../types/index';

import * as stylesImport from './Todo.scss';
const styles: any = stylesImport;
import strings from './../strings';

/**
 * The TodoTabs component using fabric-react component <Pivot> <List> <FocusZone>.
 *
 * Link of <Pivot>: https://developer.microsoft.com/en-us/fluentui#/controls/web/pivot
 * Link of <List>: https://developer.microsoft.com/en-us/fluentui#/controls/web/list
 * Link of <FocusZone>: https://developer.microsoft.com/en-us/fluentui#/controls/web/focuszone
 */
export default class TodoTabs extends React.Component<ITodoTabsProps, {}> {
  public render(): React.ReactElement<IPivotProps> | null {
    const pivotArray: React.ReactElement<IPivotProps>[] = [];

    const activeTasks: ITodoItem[] = this.props.items.filter((task: ITodoItem) => task.isComplete === false);
    const completedTasks: ITodoItem[] = this.props.items.filter((task: ITodoItem) => task.isComplete === true);
    const allTasks: ITodoItem[] = activeTasks.concat(completedTasks);

    this._onRenderTodoItem = this._onRenderTodoItem.bind(this);

    if (activeTasks.length > 0) {
      pivotArray.push(this._renderPivotItemList(activeTasks, strings.todoListTabNameActive));
    }

    if (completedTasks.length > 0) {
      pivotArray.push(this._renderPivotItemList(completedTasks, strings.todoListTabNameCompleted));
    }

    if (allTasks.length > 0) {
      pivotArray.push(this._renderPivotItemList(allTasks, strings.todoListTabNameAllTasks));
    }

    return pivotArray.length > 0 ? (
      <div className={styles.todoPivot}>
        <Pivot linkSize={PivotLinkSize.large}>{pivotArray}</Pivot>
      </div>
    ) : null;
  }

  private _renderPivotItemList(tasks: ITodoItem[], tabName: string): React.ReactElement<IPivotProps> {
    // @todo #219004 make shouldEnterInnerZone be rtl safe.
    return (
      <PivotItem headerText={`${tabName} (${tasks.length})`}>
        <FocusZone direction={FocusZoneDirection.vertical} shouldEnterInnerZone={this._shouldEnterInnerZone}>
          <List className={styles.todoList} items={tasks} onRenderCell={this._onRenderTodoItem} />
        </FocusZone>
      </PivotItem>
    );
  }

  private _shouldEnterInnerZone = (ev: React.KeyboardEvent<HTMLElement>): boolean => {
    return ev.which === KeyCodes.right;
  };

  private _onRenderTodoItem(item?: ITodoItem): React.ReactElement<ITodoItemProps> | null {
    if (item) {
      return (
        <TodoItem
          key={item.id}
          item={item}
          onToggleComplete={this.props.onToggleComplete}
          onDeleteItem={this.props.onDeleteItem}
        />
      );
    }
    return null;
  }
}
