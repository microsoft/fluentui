import * as React from 'react';
import {
  autobind,
  css,
  getId,
} from '../../Utilities';
import { IGridCellProps } from './GridCell.types';
import { CommandButton } from '../../Button';

export class GridCell<T, P extends IGridCellProps<T>> extends React.Component<P, {}> {

  public static defaultProps = {
    disabled: false,
    id: getId('gridCell')
  };

  public render() {
    const {
      item,
      id,
      className,
      role,
      selected,
      disabled,
      onRenderItem,
      cellDisabledStyle,
      cellIsSelectedStyle,
      index,
      label,
      getClassNames
    } = this.props;

    return (
      <CommandButton
        id={ id + '-item' + index }
        data-index={ index }
        data-is-focusable={ true }
        disabled={ disabled }
        className={ css(className,
          {
            ['' + cellIsSelectedStyle]: selected,
            ['' + cellDisabledStyle]: disabled
          }
        ) }
        onClick={ this._onClick }
        onMouseEnter={ this._onMouseEnter }
        onMouseLeave={ this._onMouseLeave }
        onFocus={ this._onFocus }
        role={ role }
        aria-selected={ selected }
        ariaLabel={ label }
        title={ label }
        getClassNames={ getClassNames }
      >
        { onRenderItem(item) }
      </CommandButton >
    );
  }

  @autobind
  private _onClick() {
    const {
      onClick,
      disabled,
      item
      } = this.props as P;

    if (onClick && !disabled) {
      onClick(item);
    }
  }

  @autobind
  private _onMouseEnter() {
    const {
      onHover,
      disabled,
      item
      } = this.props as P;

    if (onHover && !disabled) {
      onHover(item);
    }
  }

  @autobind
  private _onMouseLeave() {
    const {
      onHover,
      disabled
      } = this.props as P;

    if (onHover && !disabled) {
      onHover();
    }
  }

  @autobind
  private _onFocus() {
    const {
      onFocus,
      disabled,
      item
      } = this.props as P;

    if (onFocus && !disabled) {
      onFocus(item);
    }
  }

}