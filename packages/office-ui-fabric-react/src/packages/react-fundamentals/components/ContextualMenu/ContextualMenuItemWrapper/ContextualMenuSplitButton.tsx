import * as React from 'react';
import { buttonProperties, getNativeProps, KeyCodes, mergeAriaAttributeValues, memoizeFunction } from '../../../Utilities';
import { ContextualMenuItem } from '../ContextualMenuItem';
import { IContextualMenuItem } from '../ContextualMenu.types';
import { IMenuItemClassNames, getSplitButtonVerticalDividerClassNames } from '../ContextualMenu.classNames';
import { KeytipData } from '../../../KeytipData';
import { isItemDisabled, hasSubmenu } from '../../../utilities/contextualMenu/index';
import { VerticalDivider } from '../../../Divider';
import { ContextualMenuItemWrapper } from './ContextualMenuItemWrapper';
import { IKeytipProps } from '../../Keytip/Keytip.types';

export interface IContextualMenuSplitButtonState {}

const TouchIdleDelay = 500; /* ms */

export class ContextualMenuSplitButton extends ContextualMenuItemWrapper {
  private _splitButton: HTMLDivElement;
  private _lastTouchTimeoutId: number | undefined;
  private _processingTouch: boolean;

  private _getMemoizedMenuButtonKeytipProps = memoizeFunction((keytipProps: IKeytipProps) => {
    return {
      ...keytipProps,
      hasMenu: true
    };
  });

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
      expandedMenuItemKey
    } = this.props;

    const itemHasSubmenu = hasSubmenu(item);

    let { keytipProps } = item;
    if (keytipProps) {
      keytipProps = this._getMemoizedMenuButtonKeytipProps(keytipProps);
    }

    return (
      <KeytipData keytipProps={keytipProps} disabled={isItemDisabled(item)}>
        {(keytipAttributes: any): JSX.Element => (
          <div
            data-ktp-target={keytipAttributes['data-ktp-target']}
            ref={(splitButton: HTMLDivElement) => (this._splitButton = splitButton)}
            role={'menuitem'}
            aria-label={item.ariaLabel}
            className={classNames.splitContainer}
            aria-disabled={isItemDisabled(item)}
            aria-expanded={itemHasSubmenu ? item.key === expandedMenuItemKey : undefined}
            aria-haspopup={true}
            aria-describedby={mergeAriaAttributeValues(item.ariaDescription, keytipAttributes['aria-describedby'])}
            aria-checked={item.isChecked || item.checked}
            aria-posinset={focusableElementIndex + 1}
            aria-setsize={totalItemCount}
            onMouseEnter={this._onItemMouseEnterPrimary}
            onMouseLeave={onItemMouseLeave ? onItemMouseLeave.bind(this, { ...item, subMenuProps: null, items: null }) : undefined}
            onMouseMove={this._onItemMouseMovePrimary}
            onKeyDown={this._onItemKeyDown}
            onClick={this._executeItemClick}
            onTouchStart={this._onTouchStart}
            tabIndex={0}
            data-is-focusable={true}
            aria-roledescription={item['aria-roledescription']}
          >
            {this._renderSplitPrimaryButton(item, classNames, index, hasCheckmarks!, hasIcons!)}
            {this._renderSplitDivider(item)}
            {this._renderSplitIconButton(item, classNames, index, keytipAttributes)}
          </div>
        )}
      </KeytipData>
    );
  }

  protected _onItemKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    const { item, onItemKeyDown } = this.props;
    if (ev.which === KeyCodes.enter) {
      this._executeItemClick(ev);
      ev.preventDefault();
      ev.stopPropagation();
    } else if (onItemKeyDown) {
      onItemKeyDown(item, ev);
    }
  };

  protected _getSubmenuTarget = (): HTMLElement | undefined => {
    return this._splitButton;
  };

  private _renderSplitPrimaryButton(
    item: IContextualMenuItem,
    classNames: IMenuItemClassNames,
    index: number,
    hasCheckmarks: boolean,
    hasIcons: boolean
  ) {
    const { contextualMenuItemAs: ChildrenRenderer = ContextualMenuItem, onItemClick } = this.props;

    const itemProps: IContextualMenuItem = {
      key: item.key,
      disabled: isItemDisabled(item) || item.primaryDisabled,
      name: item.name,
      text: item.text || item.name,
      className: classNames.splitPrimary,
      canCheck: item.canCheck,
      isChecked: item.isChecked,
      checked: item.checked,
      iconProps: item.iconProps,
      'data-is-focusable': false,
      'aria-hidden': true
    };

    const { itemProps: itemComponentProps } = item;

    return (
      <button {...getNativeProps(itemProps, buttonProperties)}>
        <ChildrenRenderer
          data-is-focusable={false}
          item={itemProps}
          classNames={classNames}
          index={index}
          onCheckmarkClick={hasCheckmarks && onItemClick ? onItemClick : undefined}
          hasIcons={hasIcons}
          {...itemComponentProps}
        />
      </button>
    );
  }

  private _renderSplitDivider(item: IContextualMenuItem) {
    const getDividerClassNames = item.getSplitButtonVerticalDividerClassNames || getSplitButtonVerticalDividerClassNames;
    return <VerticalDivider getClassNames={getDividerClassNames} />;
  }

  private _renderSplitIconButton(item: IContextualMenuItem, classNames: IMenuItemClassNames, index: number, keytipAttributes: any) {
    const {
      contextualMenuItemAs: ChildrenRenderer = ContextualMenuItem,
      onItemMouseLeave,
      onItemMouseDown,
      openSubMenu,
      dismissSubMenu,
      dismissMenu
    } = this.props;

    const itemProps: IContextualMenuItem = {
      onClick: this._onIconItemClick,
      disabled: isItemDisabled(item),
      className: classNames.splitMenu,
      subMenuProps: item.subMenuProps,
      submenuIconProps: item.submenuIconProps,
      split: true,
      key: item.key
    };

    const buttonProps = {
      ...getNativeProps<React.ButtonHTMLAttributes<HTMLButtonElement>>(itemProps, buttonProperties),
      ...{
        onMouseEnter: this._onItemMouseEnterIcon,
        onMouseLeave: onItemMouseLeave ? onItemMouseLeave.bind(this, item) : undefined,
        onMouseDown: (ev: React.MouseEvent<HTMLButtonElement>) => (onItemMouseDown ? onItemMouseDown(item, ev) : undefined),
        onMouseMove: this._onItemMouseMoveIcon,
        'data-is-focusable': false,
        'data-ktp-execute-target': keytipAttributes['data-ktp-execute-target'],
        'aria-hidden': true
      }
    };

    const { itemProps: itemComponentProps } = item;

    return (
      <button {...buttonProps}>
        <ChildrenRenderer
          componentRef={item.componentRef}
          item={itemProps}
          classNames={classNames}
          index={index}
          hasIcons={false}
          openSubMenu={openSubMenu}
          dismissSubMenu={dismissSubMenu}
          dismissMenu={dismissMenu}
          getSubmenuTarget={this._getSubmenuTarget}
          {...itemComponentProps}
        />
      </button>
    );
  }

  private _onItemMouseEnterPrimary = (ev: React.MouseEvent<HTMLElement>): void => {
    const { item, onItemMouseEnter } = this.props;
    if (onItemMouseEnter) {
      onItemMouseEnter({ ...item, subMenuProps: undefined, items: undefined }, ev, this._splitButton);
    }
  };

  private _onItemMouseEnterIcon = (ev: React.MouseEvent<HTMLElement>): void => {
    const { item, onItemMouseEnter } = this.props;
    if (onItemMouseEnter) {
      onItemMouseEnter(item, ev, this._splitButton);
    }
  };

  private _onItemMouseMovePrimary = (ev: React.MouseEvent<HTMLElement>): void => {
    const { item, onItemMouseMove } = this.props;
    if (onItemMouseMove) {
      onItemMouseMove({ ...item, subMenuProps: undefined, items: undefined }, ev, this._splitButton);
    }
  };

  private _onItemMouseMoveIcon = (ev: React.MouseEvent<HTMLElement>): void => {
    const { item, onItemMouseMove } = this.props;
    if (onItemMouseMove) {
      onItemMouseMove(item, ev, this._splitButton);
    }
  };

  private _onIconItemClick = (ev: React.MouseEvent<HTMLElement>): void => {
    const { item, onItemClickBase } = this.props;
    if (onItemClickBase) {
      onItemClickBase(item, ev, (this._splitButton ? this._splitButton : ev.currentTarget) as HTMLElement);
    }
  };

  private _executeItemClick = (ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void => {
    const { item, executeItemClick, onItemClick } = this.props;

    if (item.disabled || item.isDisabled) {
      return;
    }

    if (this._processingTouch && onItemClick) {
      return onItemClick(item, ev);
    }

    if (executeItemClick) {
      executeItemClick(item, ev);
    }
  };

  private _onTouchStart = (ev: React.TouchEvent<HTMLElement>): void => {
    if (this._splitButton && !('onpointerdown' in this._splitButton)) {
      this._handleTouchAndPointerEvent(ev);
    }
  };

  private _onPointerDown = (ev: PointerEvent): void => {
    if (ev.pointerType === 'touch') {
      this._handleTouchAndPointerEvent(ev);
      ev.preventDefault();
      ev.stopImmediatePropagation();
    }
  };

  private _handleTouchAndPointerEvent(ev: React.TouchEvent<HTMLElement> | PointerEvent) {
    const { onTap } = this.props;

    if (onTap) {
      onTap(ev);
    }
    // If we already have an existing timeout from a previous touch/pointer event
    // cancel that timeout so we can set a new one.
    if (this._lastTouchTimeoutId) {
      this._async.clearTimeout(this._lastTouchTimeoutId);
      this._lastTouchTimeoutId = undefined;
    }
    this._processingTouch = true;
    this._lastTouchTimeoutId = this._async.setTimeout(() => {
      this._processingTouch = false;
      this._lastTouchTimeoutId = undefined;
    }, TouchIdleDelay);
  }
}
