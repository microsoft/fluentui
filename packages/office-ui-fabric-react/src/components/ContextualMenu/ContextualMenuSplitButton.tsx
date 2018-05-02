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
import { KeytipData } from '../../KeytipData';
import { getIsChecked, isItemDisabled } from '../../utilities/contextualMenu/index';
import { VerticalDivider } from '../../Divider';
import { IContextualMenuSplitButtonProps } from './ContextualMenuSplitButton.types';

export interface IContextualMenuSplitButtonState { }

export class ContextualMenuSplitButton extends BaseComponent<IContextualMenuSplitButtonProps, IContextualMenuSplitButtonState> {
  private _splitButton: HTMLDivElement;

  public render(): JSX.Element | null {
    const {
      item,
      classNames,
      index,
      focusableElementIndex,
      totalItemCount,
      hasCheckmarks,
      hasIcons,
      onItemMouseLeave
    } = this.props;

    let { keytipProps } = item;
    if (keytipProps) {
      keytipProps = {
        ...keytipProps,
        hasMenu: true
      };
    }

    return (
      <KeytipData keytipProps={ keytipProps } disabled={ isItemDisabled(item) }>
        { (keytipAttributes: any): JSX.Element => (
          <div
            data-ktp-target={ keytipAttributes['data-ktp-target'] }
            ref={ (splitButton: HTMLDivElement) => this._splitButton = splitButton }
            role={ 'button' }
            aria-labelledby={ item.ariaLabel }
            className={ classNames.splitContainer }
            aria-disabled={ isItemDisabled(item) }
            aria-haspopup={ true }
            aria-describedby={ item.ariaDescription + (keytipAttributes['aria-describedby'] || '') }
            aria-checked={ item.isChecked || item.checked }
            aria-posinset={ focusableElementIndex + 1 }
            aria-setsize={ totalItemCount }
            onMouseEnter={ this._onItemMouseEnterPrimary }
            onMouseLeave={ onItemMouseLeave ? onItemMouseLeave.bind(this, { ...item, subMenuProps: null, items: null }) : undefined }
            onMouseMove={ this._onItemMouseMovePrimary }
            onKeyDown={ this._onItemKeyDown }
            onClick={ this._executeItemClick }
            tabIndex={ 0 }
            data-is-focusable={ true }
          >
            { this._renderSplitPrimaryButton(item, classNames, index, hasCheckmarks!, hasIcons!) }
            { this._renderSplitDivider(item) }
            { this._renderSplitIconButton(item, classNames, index, keytipAttributes) }
          </div >
        ) }
      </KeytipData>
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
    return (
      <button { ...getNativeProps(itemProps, buttonProperties) }>
        <ChildrenRenderer
          data-is-focusable={ false }
          item={ itemProps }
          classNames={ classNames }
          index={ index }
          onCheckmarkClick={ hasCheckmarks && onItemClick ? onItemClick.bind(this, item) : undefined }
          hasIcons={ hasIcons }
        />
      </button>
    );
  }

  private _renderSplitDivider(item: IContextualMenuItem) {
    const getDividerClassNames = item.getSplitButtonVerticalDividerClassNames || getSplitButtonVerticalDividerClassNames;
    return <VerticalDivider getClassNames={ getDividerClassNames } />;
  }

  private _renderSplitIconButton(item: IContextualMenuItem, classNames: IMenuItemClassNames, index: number, keytipAttributes: any) {
    const {
      contextualMenuItemAs: ChildrenRenderer = ContextualMenuItem,
      onItemMouseLeave,
      onItemMouseDown
    } = this.props;

    const itemProps = {
      onClick: this._onIconItemClick,
      disabled: isItemDisabled(item),
      className: classNames.splitMenu,
      subMenuProps: item.subMenuProps,
      submenuIconProps: item.submenuIconProps,
      split: true,
    } as IContextualMenuItem;

    const buttonProps = assign({}, getNativeProps(itemProps, buttonProperties), {
      onMouseEnter: this._onItemMouseEnterIcon,
      onMouseLeave: onItemMouseLeave ? onItemMouseLeave.bind(this, item) : undefined,
      onMouseDown: (ev: any) => onItemMouseDown ? onItemMouseDown(item, ev) : undefined,
      onMouseMove: this._onItemMouseMoveIcon,
      'data-is-focusable': false,
      'data-ktp-execute-target': keytipAttributes['data-ktp-execute-target'],
      'aria-hidden': true
    });

    return (
      <button { ...buttonProps } >
        <ChildrenRenderer item={ itemProps } classNames={ classNames } index={ index } hasIcons={ false } />
      </button >
    );
  }

  private _onItemMouseEnterPrimary = (ev: React.MouseEvent<HTMLElement>): void => {
    const {
      item,
      onItemMouseEnter
    } = this.props;
    if (onItemMouseEnter) {
      onItemMouseEnter({ ...item, subMenuProps: undefined, items: undefined }, ev, this._splitButton);
    }
  }

  private _onItemMouseEnterIcon = (ev: React.MouseEvent<HTMLElement>): void => {
    const { item, onItemMouseEnter } = this.props;
    if (onItemMouseEnter) {
      onItemMouseEnter(item, ev, this._splitButton);
    }
  }

  private _onItemMouseMovePrimary = (ev: React.MouseEvent<HTMLElement>): void => {
    const {
      item,
      onItemMouseMove
    } = this.props;
    if (onItemMouseMove) {
      onItemMouseMove({ ...item, subMenuProps: undefined, items: undefined }, ev, this._splitButton);
    }
  }

  private _onItemMouseMoveIcon = (ev: React.MouseEvent<HTMLElement>): void => {
    const {
      item,
      onItemMouseMove
    } = this.props;
    if (onItemMouseMove) {
      onItemMouseMove(item, ev, this._splitButton);
    }
  }

  private _onIconItemClick = (ev: React.MouseEvent<HTMLElement>): void => {
    const { item, onItemClickBase } = this.props;
    if (onItemClickBase) {
      onItemClickBase(item, ev, (this._splitButton ? this._splitButton : ev.currentTarget) as HTMLElement);
    }
  }

  private _executeItemClick = (ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void => {
    const {
      item,
      executeItemClick
    } = this.props;

    if (item.disabled || item.isDisabled) {
      return;
    }

    if (executeItemClick) {
      executeItemClick(item, ev);
    }
  }

  private _onItemKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    const { item, onItemKeyDown } = this.props;
    if (ev.which === KeyCodes.enter) {
      this._executeItemClick(ev);
      ev.preventDefault();
      ev.stopPropagation();
    } else if (onItemKeyDown) {
      onItemKeyDown(item, ev);
    }
  }
}
