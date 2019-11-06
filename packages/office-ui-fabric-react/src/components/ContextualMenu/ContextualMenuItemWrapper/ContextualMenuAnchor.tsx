import * as React from 'react';
import { anchorProperties, getNativeProps, memoizeFunction } from '../../../Utilities';
import { ContextualMenuItemWrapper } from './ContextualMenuItemWrapper';
import { KeytipData } from '../../../KeytipData';
import { isItemDisabled, hasSubmenu } from '../../../utilities/contextualMenu/index';
import { ContextualMenuItem } from '../ContextualMenuItem';
import { IKeytipDataProps } from '../../KeytipData/KeytipData.types';
import { IKeytipProps } from '../../Keytip/Keytip.types';

export class ContextualMenuAnchor extends ContextualMenuItemWrapper {
  private _anchor = React.createRef<HTMLAnchorElement>();

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
    const nativeProps = getNativeProps<React.HTMLAttributes<HTMLAnchorElement>>(item, anchorProperties);
    const disabled = isItemDisabled(item);
    const { itemProps } = item;

    let { keytipProps } = item;
    if (keytipProps && itemHasSubmenu) {
      keytipProps = this._getMemoizedMenuButtonKeytipProps(keytipProps);
    }

    return (
      <div>
        <KeytipData keytipProps={item.keytipProps} ariaDescribedBy={nativeProps['aria-describedby']} disabled={disabled}>
          {(keytipAttributes: IKeytipDataProps): JSX.Element => (
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
              onMouseMove={this._onItemMouseMove}
              onKeyDown={itemHasSubmenu ? this._onItemKeyDown : undefined}
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
