import * as React from 'react';
import {
  buttonProperties,
  getNativeProps,
  memoizeFunction,
  getId,
  mergeAriaAttributeValues,
  IComponentAs,
  composeComponentAs,
} from '../../../Utilities';
import { ContextualMenuItemWrapper } from './ContextualMenuItemWrapper';
import { KeytipData } from '../../../KeytipData';
import { getIsChecked, isItemDisabled, hasSubmenu, getMenuItemAriaRole } from '../../../utilities/contextualMenu/index';
import { ContextualMenuItem } from '../ContextualMenuItem';
import type { IKeytipDataProps } from '../../../KeytipData';
import type { IKeytipProps } from '../../../Keytip';
import { IContextualMenuItemProps } from '../ContextualMenuItem.types';

export class ContextualMenuButton extends ContextualMenuItemWrapper {
  private _btn = React.createRef<HTMLButtonElement>();
  private _ariaDescriptionId: string;

  private _getMemoizedMenuButtonKeytipProps = memoizeFunction((keytipProps: IKeytipProps) => {
    return {
      ...keytipProps,
      hasMenu: true,
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
      contextualMenuItemAs,
      expandedMenuItemKey,
      onItemMouseDown,
      onItemClick,
      openSubMenu,
      dismissSubMenu,
      dismissMenu,
    } = this.props;

    let ChildrenRenderer: IComponentAs<IContextualMenuItemProps> = ContextualMenuItem;

    if (item.contextualMenuItemAs) {
      ChildrenRenderer = composeComponentAs(item.contextualMenuItemAs, ChildrenRenderer);
    }

    if (contextualMenuItemAs) {
      ChildrenRenderer = composeComponentAs(contextualMenuItemAs, ChildrenRenderer);
    }

    const isChecked: boolean | null | undefined = getIsChecked(item);
    const canCheck: boolean = isChecked !== null;
    const defaultRole = getMenuItemAriaRole(item);
    const itemHasSubmenu = hasSubmenu(item);
    const { itemProps, ariaLabel, ariaDescription } = item;

    const buttonNativeProperties = getNativeProps<React.ButtonHTMLAttributes<HTMLButtonElement>>(
      item,
      buttonProperties,
    );
    // Do not add the disabled attribute to the button so that it is focusable
    delete buttonNativeProperties.disabled;

    const itemRole = item.role || defaultRole;

    // Check for ariaDescription to set the _ariaDescriptionId and render a hidden span with
    // the description in it to be added to ariaDescribedBy
    if (ariaDescription) {
      this._ariaDescriptionId = getId();
    }
    const ariaDescribedByIds = mergeAriaAttributeValues(
      item.ariaDescribedBy,
      ariaDescription ? this._ariaDescriptionId : undefined,
      buttonNativeProperties['aria-describedby'],
    );

    const itemButtonProperties = {
      className: classNames.root,
      onClick: this._onItemClick,
      onKeyDown: itemHasSubmenu ? this._onItemKeyDown : undefined,
      onMouseEnter: this._onItemMouseEnter,
      onMouseLeave: this._onItemMouseLeave,
      onMouseDown: (ev: React.MouseEvent<HTMLButtonElement>) =>
        onItemMouseDown ? onItemMouseDown(item, ev) : undefined,
      onMouseMove: this._onItemMouseMove,
      href: item.href,
      title: item.title,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedByIds,
      'aria-haspopup': itemHasSubmenu || undefined,
      'aria-expanded': itemHasSubmenu ? item.key === expandedMenuItemKey : undefined,
      'aria-posinset': focusableElementIndex + 1,
      'aria-setsize': totalItemCount,
      'aria-disabled': isItemDisabled(item),
      'aria-checked':
        (itemRole === 'menuitemcheckbox' || itemRole === 'menuitemradio') && canCheck ? !!isChecked : undefined,
      'aria-selected': itemRole === 'menuitem' && canCheck ? !!isChecked : undefined,
      role: itemRole,
      // eslint-disable-next-line deprecation/deprecation
      style: item.style,
    };

    let { keytipProps } = item;
    if (keytipProps && itemHasSubmenu) {
      keytipProps = this._getMemoizedMenuButtonKeytipProps(keytipProps);
    }

    return (
      <KeytipData keytipProps={keytipProps} ariaDescribedBy={ariaDescribedByIds} disabled={isItemDisabled(item)}>
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
            {this._renderAriaDescription(ariaDescription, classNames.screenReaderText)}
          </button>
        )}
      </KeytipData>
    );
  }

  protected _renderAriaDescription = (ariaDescription?: string, className?: string) => {
    // If ariaDescription is given, descriptionId will be assigned to ariaDescriptionSpan
    return ariaDescription ? (
      <span id={this._ariaDescriptionId} className={className}>
        {ariaDescription}
      </span>
    ) : null;
  };

  protected _getSubmenuTarget = (): HTMLElement | undefined => {
    return this._btn.current ? this._btn.current : undefined;
  };
}
