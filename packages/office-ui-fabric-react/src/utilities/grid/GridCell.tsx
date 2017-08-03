import * as React from 'react';
import {
  autobind,
  BaseComponent,
  css,
  getId,
} from '../../Utilities';
import { IGridCellProps } from './GridCell.Props';
import { CommandButton } from '../../Button';

export class GridCell extends React.Component<IGridCellProps, {}> {

  public static defaultProps = {
    cellShape: 'circle',
    disabled: false
  };

  private _id: string;

  constructor(props: IGridCellProps) {
    super(props);

    this._id = props.id || getId('gridCell');
  }

  public render() {
    let {
      item,
      id,
      className,
      role,
      selectedIndex,
      disabled,
      onClick,
      onHover,
      onFocus,
      onRenderItem,
      cellDisabledStyle,
      cellIsSelectedStyle
    } = this.props;
    return (
      <CommandButton
        id={ id + '-item' + item.index }
        data-index={ item.index }
        data-is-focusable={ true }
        disabled={ disabled }
        className={ css(className,
          {
            ['' + cellIsSelectedStyle]: (selectedIndex !== undefined && selectedIndex === item.index),
            ['' + cellDisabledStyle]: disabled
          }
        ) }
        onClick={ this._onClick }
        onMouseEnter={ this._onMouseEnter }
        onMouseLeave={ this._onMouseLeave }
        onFocus={ this._onFocus }
        role={ role }
        aria-selected={ selectedIndex !== undefined && (selectedIndex === item.index).toString() }
        ariaLabel={ item.label && item.label }
        title={ item.label && item.label }
      >
        { onRenderItem(item) }
      </CommandButton >
    );
  }

  @autobind
  private _onClick() {
    let {
        onClick,
      disabled,
      item
      } = this.props;

    if (onClick && !disabled) {
      onClick(item);
    }
  }

  @autobind
  private _onMouseEnter() {
    let {
        onHover,
      disabled,
      item
      } = this.props;

    if (onHover && !disabled) {
      onHover(item);
    }
  }

  @autobind
  private _onMouseLeave() {
    let {
        onHover,
      disabled,
      item
      } = this.props;

    if (onHover && !disabled) {
      onHover(item);
    }
  }

  @autobind
  private _onFocus() {
    let {
        onFocus,
      disabled,
      item
      } = this.props;

    if (onFocus && !disabled) {
      onFocus(item);
    }
  }

}