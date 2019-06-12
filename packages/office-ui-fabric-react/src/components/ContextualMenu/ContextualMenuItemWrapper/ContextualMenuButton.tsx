import * as React from 'react';
import { buttonProperties, getNativeProps, memoizeFunction } from '../../../Utilities';
import { ContextualMenuItemWrapper } from './ContextualMenuItemWrapper';
import { KeytipData } from '../../../KeytipData';
import { getIsChecked, isItemDisabled, hasSubmenu } from '../../../utilities/contextualMenu/index';
import { ContextualMenuItem } from '../ContextualMenuItem';
import { IKeytipDataProps } from '../../KeytipData/KeytipData.types';
import { IKeytipProps } from '../../Keytip/Keytip.types';

export class ContextualMenuButton extends ContextualMenuItemWrapper {
  private _btn = React.createRef<HTMLButtonElement>();

  private _getMemoizedMenuButtonKeytipProps = memoizeFunction((keytipProps: IKeytipProps) => {
    return {
      ...keytipProps,
      hasMenu: true
    };
  });

  public render() {
    const {
      item,
      classNames,
      index,
      focusableElementIndex,
      totalItemCount,
      hasCheckmarks,
      hasIcons,
      contextualMenuItemAs: ChildrenRenderer = ContextualMenuItem,
      expandedMenuItemKey,
      onItemMouseDown,
      onItemClick,
      openSubMenu,
      dismissSubMenu,
      dismissMenu
    } = this.props;

    const subMenuId = this._getSubMenuId(item);

    const isChecked: boolean | null | undefined = getIsChecked(item);
    const canCheck: boolean = isChecked !== null;
    const defaultRole = canCheck ? 'menuitemcheckbox' : 'menuitem';
    const itemHasSubmenu = hasSubmenu(item);
    const { itemProps, ariaLabel } = item;

    const buttonNativeProperties = getNativeProps<React.ButtonHTMLAttributes<HTMLButtonElement>>(item, buttonProperties);
    // Do not add the disabled attribute to the button so that it is focusable
    delete buttonNativeProperties.disabled;

    const itemButtonProperties = {
      className: classNames.root,
      onClick: this._onItemClick,
      onKeyDown: itemHasSubmenu ? this._onItemKeyDown : undefined,
      onMouseEnter: this._onItemMouseEnter,
      onMouseLeave: this._onItemMouseLeave,
      onMouseDown: (ev: React.MouseEvent<HTMLButtonElement>) => (onItemMouseDown ? onItemMouseDown(item, ev) : undefined),
      onMouseMove: this._onItemMouseMove,
      href: item.href,
      title: item.title,
      'aria-label': ariaLabel,
      'aria-haspopup': itemHasSubmenu || undefined,
      'aria-owns': item.key === expandedMenuItemKey ? subMenuId : undefined,
      'aria-expanded': itemHasSubmenu ? item.key === expandedMenuItemKey : undefined,
      'aria-checked': canCheck ? !!isChecked : undefined,
      'aria-posinset': focusableElementIndex + 1,
      'aria-setsize': totalItemCount,
      'aria-disabled': isItemDisabled(item),
      role: item.role || defaultRole,
      style: item.style
    };

    let { keytipProps } = item;
    if (keytipProps && itemHasSubmenu) {
      keytipProps = this._getMemoizedMenuButtonKeytipProps(keytipProps);
    }

    return (
      <KeytipData keytipProps={keytipProps} ariaDescribedBy={buttonNativeProperties['aria-describedby']} disabled={isItemDisabled(item)}>
        {(keytipAttributes: IKeytipDataProps): JSX.Element => (
          <button ref={this._btn} {...buttonNativeProperties} {...itemButtonProperties} {...keytipAttributes}>
            <ChildrenRenderer
              componentRef={item.componentRef}
              item={item}
              classNames={classNames}
              index={index}
              onCheckmarkClick={hasCheckmarks && onItemClick ? onItemClick : undefined}
              hasIcons={hasIcons}
              openSubMenu={openSubMenu}
              dismissSubMenu={dismissSubMenu}
              dismissMenu={dismissMenu}
              getSubmenuTarget={this._getSubmenuTarget}
              {...itemProps}
            />
          </button>
        )}
      </KeytipData>
    );
  }

  protected _getSubmenuTarget = (): HTMLElement | undefined => {
    return this._btn.current ? this._btn.current : undefined;
  };
}
