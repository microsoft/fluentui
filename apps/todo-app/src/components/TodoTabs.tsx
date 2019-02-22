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
 * Link of <Pivot>: https://fabricreact.azurewebsites.net/fabric-react/master/#/examples/pivot
 * Link of <List>: https://fabricreact.azurewebsites.net/fabric-react/master/#/examples/list
 * Link of <FocusZone>: https://fabricreact.azurewebsites.net/fabric-react/master/#examples/focuszone
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
    ) : null; // tslint:disable-line:no-null-keyword
  }

  private _renderPivotItemList(tasks: ITodoItem[], tabName: string): React.ReactElement<IPivotProps> {
    // @todo #219004 make isInnerZoneKeystroke be rtl safe.
    return (
      <PivotItem headerText={`${tabName} (${tasks.length})`}>
        <FocusZone direction={FocusZoneDirection.vertical} isInnerZoneKeystroke={this._isInnerZoneKeystroke}>
          <List className={styles.todoList} items={tasks} onRenderCell={this._onRenderTodoItem} />
        </FocusZone>
      </PivotItem>
    );
  }

  private _isInnerZoneKeystroke = (ev: React.KeyboardEvent<HTMLElement>): boolean => {
    return ev.which === KeyCodes.right;
  };

  private _onRenderTodoItem(item: ITodoItem): React.ReactElement<ITodoItemProps> {
    return <TodoItem key={item.id} item={item} onToggleComplete={this.props.onToggleComplete} onDeleteItem={this.props.onDeleteItem} />;
  }
}
