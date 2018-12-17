import * as React from 'react';
import { anchorProperties, getNativeProps } from '../../../Utilities';
import { ContextualMenuItemWrapper } from './ContextualMenuItemWrapper';
import { KeytipData } from '../../../KeytipData';
import { isItemDisabled, hasSubmenu } from '../../../utilities/contextualMenu/index';
import { ContextualMenuItem } from '../ContextualMenuItem';

export class ContextualMenuAnchor extends ContextualMenuItemWrapper {
  private _anchor = React.createRef<HTMLAnchorElement>();

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
      onItemClick,
      openSubMenu,
      dismissSubMenu,
      dismissMenu
    } = this.props;

    let anchorRel = item.rel;
    if (item.target && item.target.toLowerCase() === '_blank') {
      anchorRel = anchorRel ? anchorRel : 'nofollow noopener noreferrer'; // Safe default to prevent tabjacking
    }

    const subMenuId = this._getSubMenuId(item);
    const itemHasSubmenu = hasSubmenu(item);
    const nativeProps = getNativeProps(item, anchorProperties);
    const disabled = isItemDisabled(item);
    const { itemProps } = item;

    let { keytipProps } = item;
    if (keytipProps && itemHasSubmenu) {
      keytipProps = {
        ...keytipProps,
        hasMenu: true
      };
    }

    return (
      <div>
        <KeytipData keytipProps={item.keytipProps} ariaDescribedBy={(nativeProps as any)['aria-describedby']} disabled={disabled}>
          {(keytipAttributes: any): JSX.Element => (
            <a
              {...nativeProps}
              {...keytipAttributes}
              ref={this._anchor}
              href={item.href}
              target={item.target}
              rel={anchorRel}
              className={classNames.root}
              role="menuitem"
              aria-owns={item.key === expandedMenuItemKey ? subMenuId : undefined}
              aria-haspopup={itemHasSubmenu || undefined}
              aria-expanded={itemHasSubmenu ? item.key === expandedMenuItemKey : undefined}
              aria-posinset={focusableElementIndex + 1}
              aria-setsize={totalItemCount}
              aria-disabled={isItemDisabled(item)}
              style={item.style}
              onClick={this._onItemClick}
              onMouseEnter={this._onItemMouseEnter}
              onMouseLeave={this._onItemMouseLeave}
              onKeyDown={itemHasSubmenu ? this._onItemKeyDown : null}
            >
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
            </a>
          )}
        </KeytipData>
      </div>
    );
  }

  protected _getSubmenuTarget = (): HTMLElement | undefined => {
    return this._anchor.current ? this._anchor.current : undefined;
  };

  protected _onItemClick = (ev: React.MouseEvent<HTMLElement>): void => {
    const { item, onItemClick } = this.props;
    if (onItemClick) {
      onItemClick(item, ev);
    }
  };
}
