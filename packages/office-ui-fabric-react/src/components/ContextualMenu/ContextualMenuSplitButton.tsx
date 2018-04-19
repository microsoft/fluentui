import * as React from 'react';
import {
  BaseComponent,
  assign,
  buttonProperties,
  getNativeProps,
  KeyCodes
} from '../../Utilities';
import { IContextualMenuItem } from '../../ContextualMenu';
import {
  IMenuItemClassNames,
  getSplitButtonVerticalDividerClassNames
} from './ContextualMenu.classNames';
import { ContextualMenuItem } from './ContextualMenuItem';

import { getIsChecked, isItemDisabled } from '../../utilities/contextualMenu/index';
import { VerticalDivider } from '../../Divider';
import { IContextualMenuSplitButtonProps } from './ContextualMenuSplitButton.types';

export interface IContextualMenuSplitButtonState { }

const TouchIdleDelay = 500; /* ms */

export class ContextualMenuSplitButton extends BaseComponent<IContextualMenuSplitButtonProps, IContextualMenuSplitButtonState> {
  private _processingTouch: boolean;
  private _lastTouchTimeoutId: number | undefined;
  private _splitButton: HTMLDivElement;

  public componentDidMount() {
    if (this._splitButton && 'onpointerdown' in this._splitButton) {
      this._events.on(this._splitButton, 'pointerdown', this._onPointerDown, true);
    }
  }

  public render(): JSX.Element | null {
    const {
      item,
      classNames,
      index,
      focusableElementIndex,
      totalItemCount,
      hasCheckmarks,
      hasIcons,
      onItemMouseLeave,
      onItemMouseMove
    } = this.props;

    return (
      <div
        ref={ (splitButton: HTMLDivElement) => this._splitButton = splitButton }
        role={ 'button' }
        aria-labelledby={ item.ariaLabel }
        className={ classNames.splitContainer }
        aria-disabled={ isItemDisabled(item) }
        aria-haspopup={ true }
        aria-describedby={ item.ariaDescription }
        aria-checked={ item.isChecked || item.checked }
        aria-posinset={ focusableElementIndex + 1 }
        aria-setsize={ totalItemCount }
        onMouseEnter={ this._onItemMouseEnter.bind(this, { ...item, subMenuProps: null, items: null }) }
        onMouseLeave={ onItemMouseLeave ? onItemMouseLeave.bind(this, { ...item, subMenuProps: null, items: null }) : undefined }
        onMouseMove={ onItemMouseMove ? this._onItemMouseMove.bind(this, { ...item, subMenuProps: null, items: null }) : undefined }
        onKeyDown={ this._onItemKeyDown.bind(this, item) }
        onClick={ this._executeItemClick.bind(this, item) }
        onTouchStart={ this._onTouchStart }
        tabIndex={ 0 }
        data-is-focusable={ true }
      >
        { this._renderSplitPrimaryButton(item, classNames, index, hasCheckmarks!, hasIcons!) }
        { this._renderSplitDivider(item) }
        { this._renderSplitIconButton(item, classNames, index) }
      </div >
    );
  }

  private _renderSplitPrimaryButton(item: IContextualMenuItem, classNames: IMenuItemClassNames, index: number, hasCheckmarks: boolean, hasIcons: boolean) {
    const isChecked: boolean | null | undefined = getIsChecked(item);
    const canCheck: boolean = isChecked !== null;
    const defaultRole = canCheck ? 'menuitemcheckbox' : 'menuitem';
    const {
      contextualMenuItemAs: ChildrenRenderer = ContextualMenuItem,
      onItemClick
    } = this.props;

    const itemProps = {
      key: item.key,
      disabled: isItemDisabled(item) || item.primaryDisabled,
      name: item.name,
      className: classNames.splitPrimary,
      role: item.role || defaultRole,
      canCheck: item.canCheck,
      isChecked: item.isChecked,
      checked: item.checked,
      icon: item.icon,
      iconProps: item.iconProps,
      'data-is-focusable': false,
      'aria-hidden': true
    } as IContextualMenuItem;
    return React.createElement('button',
      getNativeProps(itemProps, buttonProperties),
      <ChildrenRenderer data-is-focusable={ false } item={ itemProps } classNames={ classNames } index={ index } onCheckmarkClick={ hasCheckmarks && onItemClick ? onItemClick.bind(this, item) : undefined } hasIcons={ hasIcons } />,
    );
  }

  private _renderSplitDivider(item: IContextualMenuItem) {
    const getDividerClassnames = item.getSplitButtonVerticalDividerClassNames || getSplitButtonVerticalDividerClassNames;
    return <VerticalDivider getClassNames={ getDividerClassnames } />;
  }

  private _renderSplitIconButton(item: IContextualMenuItem, classNames: IMenuItemClassNames, index: number) {
    const {
      contextualMenuItemAs: ChildrenRenderer = ContextualMenuItem,
      onItemMouseEnter,
      onItemMouseLeave,
      onItemMouseDown,
      onItemMouseMove
    } = this.props;

    // With the introduction of touch support for split buttons. We would now open sub-menus by touching anywhere
    // on the split button but we can now longer trigger the primary action. This is correct from an accessibility
    // stand point, however we're missing the next part which is having a primary action as an option to the sub menu
    // of the split button. This should be enforced by being dynamically added into our list of sub menu items.
    // This is logged on Issue #4532
    const itemProps = {
      onClick: this._onSplitItemClick.bind(this, item),
      disabled: isItemDisabled(item),
      className: classNames.splitMenu,
      subMenuProps: item.subMenuProps,
      submenuIconProps: item.submenuIconProps,
      split: true,
    } as IContextualMenuItem;

    return React.createElement('button',
      assign({}, getNativeProps(itemProps, buttonProperties), {
        onMouseEnter: onItemMouseEnter ? onItemMouseEnter.bind(this, item, ) : undefined,
        onMouseLeave: onItemMouseLeave ? onItemMouseLeave.bind(this, item) : undefined,
        onMouseDown: (ev: any) => onItemMouseDown ? onItemMouseDown(item, ev) : undefined,
        onMouseMove: onItemMouseMove ? this._onItemMouseMove.bind(this, item) : undefined,
        'data-is-focusable': false,
        'aria-hidden': true
      }),
      <ChildrenRenderer item={ itemProps } classNames={ classNames } index={ index } hasIcons={ false } />
    );
  }

  private _onTouchStart = (): void => {
    if (this._splitButton && !('onpointerdown' in this._splitButton)) {
      this._handleTouchAndPointerEvent();
    }
  }

  private _onPointerDown = (ev: PointerEvent): void => {
    if (ev.pointerType === 'touch') {
      this._handleTouchAndPointerEvent();

      ev.preventDefault();
      ev.stopImmediatePropagation();
    }
  }

  private _handleTouchAndPointerEvent() {
    // If we already have an existing timeout from a previous touch/pointer event
    // cancel that timeout so we can set a new one.
    if (this._lastTouchTimeoutId !== undefined) {
      this._async.clearTimeout(this._lastTouchTimeoutId);
      this._lastTouchTimeoutId = undefined;
    }
    this._processingTouch = true;

    this._lastTouchTimeoutId = this._async.setTimeout(() => {
      this._processingTouch = false;
      this._lastTouchTimeoutId = undefined;
    }, TouchIdleDelay);
  }

  private _onItemMouseEnter = (item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement>): void => {
    const { onItemMouseEnter } = this.props;
    if (onItemMouseEnter) {
      onItemMouseEnter(item, ev, this._splitButton);
    }
  }

  private _onItemMouseMove = (item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement>): void => {
    const { onItemMouseMove } = this.props;
    if (onItemMouseMove) {
      onItemMouseMove(item, ev, this._splitButton);
    }
  }

  private _onSplitItemClick = (item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement>): void => {
    const { onItemClickBase } = this.props;
    if (onItemClickBase) {
      onItemClickBase(item, ev, (this._splitButton ? this._splitButton : ev.currentTarget) as HTMLElement);
    }
  }

  private _executeItemClick = (item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void => {
    const {
      onItemClick,
      executeItemClick
    } = this.props;

    if (item.disabled || item.isDisabled) {
      return;
    }

    if (this._processingTouch && onItemClick) {
      return onItemClick(item, ev);
    }

    if (executeItemClick) {
      executeItemClick(item, ev);
    }
  }

  private _onItemKeyDown = (item: any, ev: React.KeyboardEvent<HTMLElement>): void => {
    const { onItemKeyDown } = this.props;
    if (ev.which === KeyCodes.enter) {
      this._executeItemClick(item, ev);
      ev.preventDefault();
      ev.stopPropagation();
    } else if (onItemKeyDown) {
      onItemKeyDown(item, ev);
    }
  }
}
