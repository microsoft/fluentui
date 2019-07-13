import * as React from 'react';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { ITodoItem, ITodoItemProps } from '../types/index';

import * as stylesImport from './Todo.scss';
const styles: any = stylesImport;
import strings from './../strings';

/**
 * TodoItem component using fabric-react component <FocusZone> <Checkbox> <IconButton> <DocumentCardActivity>.
 *
 * Link of FocusZone: https://fabricreact.azurewebsites.net/fabric-react/master/#examples/focuszone
 * Link of Checkbox: https://fabricreact.azurewebsites.net/fabric-react/master/#/examples/checkbox
 * Link of Button: https://fabricreact.azurewebsites.net/fabric-react/master/#/examples/button
 * Link of DocumentCardActivity: https://fabricreact.azurewebsites.net/fabric-react/master/#/examples/documentcard
 */
export default class TodoItem extends React.Component<ITodoItemProps, {}> {
  private static ANIMATION_TIMEOUT = 200;

  private _animationTimeoutId!: number;
  private _rowItem!: HTMLDivElement;

  constructor(props: ITodoItemProps) {
    super(props);

    this._onCheckboxChange = this._onCheckboxChange.bind(this);
    this._onDelete = this._onDelete.bind(this);
  }

  public componentWillUnmount(): void {
    window.clearTimeout(this._animationTimeoutId);
  }

  public render(): React.ReactElement<React.HTMLAttributes<HTMLDivElement>> {
    const className: string = css(
      styles.todoItem,
      this.props.item.isComplete === true ? styles.isCompleted : '',
      'ms-Grid',
      'ms-slideDownIn20'
    );

    return (
      <div
        role="row"
        ref={(ref: HTMLDivElement) => (this._rowItem = ref)}
        className={className}
        aria-label={this._ariaLabel}
        data-is-focusable={true}
      >
        <FocusZone direction={FocusZoneDirection.horizontal}>
          <div className={css(styles.itemTaskRow, 'ms-Grid-row')}>
            <Checkbox label={this.props.item.title} onChange={this._onCheckboxChange} checked={!!this.props.item.isComplete} />
            <IconButton
              className={styles.deleteButton}
              iconProps={{ iconName: 'X' }}
              onClick={this._onDelete}
              title={strings.deleteItemTitle}
              ariaLabel={strings.deleteItemAriaLabel}
            />
          </div>
        </FocusZone>
      </div>
    );
  }

  private get _ariaLabel(): string {
    const completeState: string = this.props.item.isComplete
      ? strings.todoItemAriaLabelCheckedState
      : strings.todoItemAriaLabelUncheckedState;
    const titleString: string = strings.todoItemAriaLabelTitle + this.props.item.title;
    return `${completeState} ${titleString}`;
  }

  private _onCheckboxChange(ev?: React.FormEvent<HTMLElement>, isChecked?: boolean): void {
    this._handleWithAnimation(this.props.onToggleComplete, 'ms-slideUpOut20');
  }

  private _onDelete(event: React.MouseEvent<HTMLButtonElement>): void {
    this._handleWithAnimation(this.props.onDeleteItem, 'ms-slideUpOut20');
  }

  private _handleWithAnimation(callback: (task: ITodoItem) => void, animationClass: string): void {
    this._rowItem.classList.add(animationClass);

    window.clearTimeout(this._animationTimeoutId);
    this._animationTimeoutId = window.setTimeout(() => {
      this._rowItem.classList.add(styles.isHidden);
      callback(this.props.item);
    }, TodoItem.ANIMATION_TIMEOUT);
  }
}
