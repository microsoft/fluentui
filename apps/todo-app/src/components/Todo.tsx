import * as React from 'react';
import { Spinner, SpinnerType } from '@fluentui/react/lib/Spinner';
import { ITodoProps, ITodoState } from '../types/index';

import TodoForm from './TodoForm';
import TodoTabs from './TodoTabs';

import * as stylesImport from './Todo.scss';
const styles: any = stylesImport;
import strings from '../strings';

/**
 * Todo component is the top level react component of this web part.
 * It uses fabric-react component <Spinner>
 *
 * Link of Spinner: https://developer.microsoft.com/en-us/fluentui#/controls/web/spinner
 */
export default class Todo extends React.Component<ITodoProps, ITodoState> {
  constructor(props: ITodoProps) {
    super(props);

    this._onProviderChange = this._onProviderChange.bind(this);
    this.state = {
      items: this.props.dataProvider.items,
    };
  }

  public componentDidMount(): void {
    this.props.dataProvider.addListener(this._onProviderChange);
  }

  public componentWillUnmount(): void {
    this.props.dataProvider.removeListener(this._onProviderChange);
  }

  public render(): React.ReactElement<ITodoProps> {
    return (
      <div className={styles.todo}>
        <div className={styles.topRow}>
          <h2 className={styles.todoHeading}>{strings.todoListTitle}</h2>
          {this._renderWorkingOnItSpinner()}
        </div>
        <TodoForm onSubmit={this.props.dataProvider.createItem} />
        <TodoTabs
          items={this.state.items}
          onToggleComplete={this.props.dataProvider.toggleComplete}
          onDeleteItem={this.props.dataProvider.deleteItem}
        />
        {this._renderFetchingTasksSpinner()}
      </div>
    );
  }

  private _renderWorkingOnItSpinner(): React.ReactElement<React.HTMLAttributes<HTMLDivElement>> | false {
    return (
      this.props.dataProvider.isLoading &&
      this.state.items.length > 0 && (
        <div className={styles.workingOnItSpinner}>
          <Spinner type={SpinnerType.normal} />
        </div>
      )
    );
  }

  private _renderFetchingTasksSpinner(): React.ReactElement<React.HTMLAttributes<HTMLDivElement>> | false {
    return (
      this.props.dataProvider.isLoading &&
      this.state.items.length === 0 && (
        <div className={styles.fetchingTasksSpinner}>
          <Spinner type={SpinnerType.large} label={strings.fetchingTasksLabel} />
        </div>
      )
    );
  }

  private _onProviderChange(): void {
    this.setState({
      items: this.props.dataProvider.items,
    });
  }
}
