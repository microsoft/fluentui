import * as React from 'react';
import {
  autobind,
  css,
  getId,
  styled
} from '../../Utilities';
import { IGridCellProps } from './GridCell.types';
import { ButtonBase, IButtonBaseProps, getButtonBaseStyles } from '../../Button';

export class GridCell<T, P extends IGridCellProps<T>> extends React.Component<P, {}> {

  public static defaultProps = {
    disabled: false,
    id: getId('gridCell')
  };

  public render() {
    let {
      item,
      id,
      className,
      role,
      selected,
      disabled,
      onRenderItem,
      index,
      label,
      getStyles
    } = this.props;

    const GridCellButton = styled(
      ButtonBase,
      getButtonBaseStyles,
    );

    return (
      <GridCellButton
        id={ id + '-item' + index }
        data-index={ index }
        data-is-focusable={ true }
        disabled={ disabled }
        checked={ selected }
        className={ css(className) }
        onClick={ this._onClick }
        onMouseEnter={ this._onMouseEnter }
        onMouseLeave={ this._onMouseLeave }
        onFocus={ this._onFocus }
        role={ role }
        aria-selected={ selected }
        ariaLabel={ label }
        title={ label }
        getStyles={ getStyles }
      >
        { onRenderItem(item) }
      </GridCellButton >
    );
  }

  @autobind
  private _onClick() {
    let {
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
    let {
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
    let {
      onHover,
      disabled
      } = this.props as P;

    if (onHover && !disabled) {
      onHover();
    }
  }

  @autobind
  private _onFocus() {
    let {
      onFocus,
      disabled,
      item
      } = this.props as P;

    if (onFocus && !disabled) {
      onFocus(item);
    }
  }

}