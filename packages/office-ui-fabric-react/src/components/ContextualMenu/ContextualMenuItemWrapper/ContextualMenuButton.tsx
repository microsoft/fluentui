import * as React from 'react';
import {
  buttonProperties,
  getNativeProps,
  createRef
} from '../../../Utilities';
import { ContextualMenuItemWrapper } from './ContextualMenuItemWrapper';
import { KeytipData } from '../../../KeytipData';
import { getIsChecked, isItemDisabled, hasSubmenu } from '../../../utilities/contextualMenu/index';
import { ContextualMenuItem } from '../ContextualMenuItem';

export class ContextualMenuButton extends ContextualMenuItemWrapper {
  private _btn = createRef<HTMLButtonElement>();

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

    let ariaLabel = '';

    if (item.ariaLabel) {
      ariaLabel = item.ariaLabel;
    } else if (item.name) {
      ariaLabel = item.name;
    }

    const isChecked: boolean | null | undefined = getIsChecked(item);
    const canCheck: boolean = isChecked !== null;
    const defaultRole = canCheck ? 'menuitemcheckbox' : 'menuitem';
    const itemHasSubmenu = hasSubmenu(item);

    const buttonNativeProperties = getNativeProps(item, buttonProperties);
    // Do not add the disabled attribute to the button so that it is focusable
    delete (buttonNativeProperties as any).disabled;

    const itemButtonProperties = {
      className: classNames.root,
      onClick: this._onItemClick,
      onKeyDown: itemHasSubmenu ? this._onItemKeyDown : null,
      onMouseEnter: this._onItemMouseEnter,
      onMouseLeave: this._onItemMouseLeave,
      onMouseDown: (ev: any) => onItemMouseDown ? onItemMouseDown(item, ev) : undefined,
      onMouseMove: this._onItemMouseMove,
      href: item.href,
      title: item.title,
      'aria-label': ariaLabel,
      'aria-haspopup': itemHasSubmenu || undefined,
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
      keytipProps = {
        ...keytipProps,
        hasMenu: true
      };
    }

    return (
      <KeytipData
        keytipProps={ keytipProps }
        ariaDescribedBy={ (buttonNativeProperties as any)['aria-describedby'] }
        disabled={ isItemDisabled(item) }
      >
        { (keytipAttributes: any): JSX.Element => (
          <button
            ref={ this._btn }
            { ...buttonNativeProperties as React.ButtonHTMLAttributes<HTMLButtonElement> }
            { ...itemButtonProperties as React.ButtonHTMLAttributes<HTMLButtonElement> }
            { ...keytipAttributes }
          >
            <ChildrenRenderer
              componentRef={ item.componentRef }
              item={ item }
              classNames={ classNames }
              index={ index }
              onCheckmarkClick={ hasCheckmarks && onItemClick ? onItemClick.bind(this, item) : undefined }
              hasIcons={ hasIcons }
              openSubMenu={ openSubMenu }
              dismissSubMenu={ dismissSubMenu }
              dismissMenu={ dismissMenu }
              getSubmenuTarget={ this._getSubmenuTarget }
            />
          </button>
        ) }
      </KeytipData>
    );
  }

  protected _getSubmenuTarget = (): HTMLElement | undefined => {
    return this._btn.current ? this._btn.current : undefined;
  }
}