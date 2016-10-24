import * as React from 'react';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { DocumentCardActivity } from 'office-ui-fabric-react/lib/DocumentCard';
import { css } from 'office-ui-fabric-react/lib/utilities/css';
import { ITodoItem, ITodoItemProps } from '../types/index';

import styles from './Todo.module.scss';
import strings from './../strings';

/**
 * TodoItem component using fabric-react component <FocusZone> <Checkbox> <Button> <DocumentCardActivity>.
 *
 * Link of FocusZone: https://fabricreact.azurewebsites.net/fabric-react/master/#examples/focuszone
 * Link of Checkbox: https://fabricreact.azurewebsites.net/fabric-react/master/#/examples/checkbox
 * Link of Button: https://fabricreact.azurewebsites.net/fabric-react/master/#/examples/button
 * Link of DocumentCardActivity: https://fabricreact.azurewebsites.net/fabric-react/master/#/examples/documentcard
 */
export default class TodoItem extends React.Component<ITodoItemProps, {}> {
  private static ANIMATION_TIMEOUT: number = 200;

  private _animationTimeoutId: number;
  private _rowItem: HTMLDivElement;

  constructor(props: ITodoItemProps) {
    super(props);

    this._onCheckboxChange = this._onCheckboxChange.bind(this);
    this._onDelete = this._onDelete.bind(this);
  }

  public componentWillUnmount(): void {
    window.clearTimeout(this._animationTimeoutId);
  }

  public render(): React.ReactElement<React.HTMLProps<HTMLDivElement>> {
    const className: string = css(
      styles.todoItem,
      this.props.item.isComplete === true ? styles.isCompleted : '',
      'ms-Grid',
      'ms-u-slideDownIn20'
    );

    return (
      <div
        role='row'
        ref={ (ref: HTMLDivElement) => this._rowItem = ref }
        className={ className }
        aria-label={ this._ariaLabel }
        data-is-focusable={ true }
      >
        <FocusZone direction={ FocusZoneDirection.horizontal }>
          <div className={ css(styles.itemTaskRow, 'ms-Grid-row') }>
            <Checkbox
              label={ this.props.item.title }
              onChange={ this._onCheckboxChange }
              checked={ this.props.item.isComplete === true }
            />
            <Button
              className={ styles.deleteButton }
              buttonType={ButtonType.icon}
              icon='x'
              onClick={ this._onDelete }
              title={ strings.deleteItemTitle }
              ariaLabel={ strings.deleteItemAriaLabel }
            />
          </div>
        </FocusZone>
      </div>
    );
  }

  private get _ariaLabel(): string {
    const completeState: string = this.props.item.isComplete === true
      ? strings.todoItemAriaLabelCheckedState
      : strings.todoItemAriaLabelUncheckedState;
    const titleString: string = strings.todoItemAriaLabelTitle + this.props.item.title;
    return `${completeState} ${titleString}`;
  }

  private _onCheckboxChange(ev: React.FormEvent, isChecked: boolean): void {
    this._handleWithAnimation(this.props.onToggleComplete, 'ms-u-slideUpOut20');
  }

  private _onDelete(event: React.MouseEvent<HTMLElement>): void {
    this._handleWithAnimation(this.props.onDeleteItem, 'ms-u-slideUpOut20');
  }

  private _handleWithAnimation(callback: (task: ITodoItem) => void, animationClass: string): void {
    this._rowItem.classList.add(animationClass);

    window.clearTimeout(this._animationTimeoutId);
    this._animationTimeoutId = window.setTimeout(
      () => {
        this._rowItem.classList.add(styles.isHidden);
        callback(this.props.item);
      },
      TodoItem.ANIMATION_TIMEOUT
    );
  }
}
