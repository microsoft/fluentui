import * as React from 'react';
import {
  BaseComponent,
  anchorProperties,
  getNativeProps,
} from '../../../Utilities';
import { IContextualMenuAnchorProps } from './ContextualMenuAnchor.types';
import { KeytipData } from '../../KeytipData';
import { isItemDisabled, hasSubmenu } from '../../../utilities/contextualMenu/index';
import { IContextualMenuItem, ContextualMenuItem } from '../../ContextualMenu';

export class ContextualMenuAnchor extends BaseComponent<IContextualMenuAnchorProps, {}> {
  private _anchor: HTMLAnchorElement;

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
      onItemClick
    } = this.props;

    let anchorRel = item.rel;
    if (item.target && item.target.toLowerCase() === '_blank') {
      anchorRel = anchorRel ? anchorRel : 'nofollow noopener noreferrer';  // Safe default to prevent tabjacking
    }

    const subMenuId = this._getSubMenuId(item);
    const itemHasSubmenu = hasSubmenu(item);
    const nativeProps = getNativeProps(item, anchorProperties);
    const disabled = isItemDisabled(item);

    return (
      <div>
        <KeytipData
          keytipProps={ item.keytipProps }
          ariaDescribedBy={ (nativeProps as any)['aria-describedby'] }
          disabled={ disabled }
        >
          { (keytipAttributes: any): JSX.Element => (
            <a
              { ...nativeProps }
              { ...keytipAttributes }
              ref={ (anchor: HTMLAnchorElement) => this._anchor = anchor }
              href={ item.href }
              target={ item.target }
              rel={ anchorRel }
              className={ classNames.root }
              role='menuitem'
              aria-owns={ item.key === expandedMenuItemKey ? subMenuId : undefined }
              aria-haspopup={ itemHasSubmenu || undefined }
              aria-expanded={ itemHasSubmenu ? item.key === expandedMenuItemKey : undefined }
              aria-posinset={ focusableElementIndex + 1 }
              aria-setsize={ totalItemCount }
              aria-disabled={ isItemDisabled(item) }
              style={ item.style }
              onClick={ this._onItemClick }
              onMouseEnter={ this._onItemMouseEnter }
              onMouseLeave={ this._onItemMouseLeave }
              onKeyDown={ itemHasSubmenu ? this._onItemKeyDown : null }
            >
              <ChildrenRenderer
                item={ item }
                classNames={ classNames }
                index={ index }
                onCheckmarkClick={ hasCheckmarks && onItemClick ? onItemClick.bind(this, item) : undefined }
                hasIcons={ hasIcons }
              />
            </a>
          ) }
        </KeytipData>
      </div>);
  }

  public openSubMenu = (): void => {
    const { item, openSubMenu } = this.props;
    if (hasSubmenu(item) && openSubMenu && this._anchor) {
      openSubMenu(item, this._anchor);
    }
  }

  public dismissSubMenu = (): void => {
    const { item, dismissSubMenu } = this.props;
    if (hasSubmenu(item) && dismissSubMenu) {
      dismissSubMenu();
    }
  }

  public dismissMenu = (dismissAll?: boolean): void => {
    const { dismissMenu } = this.props;
    if (dismissMenu) {
      dismissMenu(dismissAll);
    }
  }

  private _onItemMouseEnter = (ev: React.MouseEvent<HTMLElement>): void => {
    const { item, onItemMouseEnter } = this.props;
    if (onItemMouseEnter) {
      onItemMouseEnter(item, ev, ev.currentTarget as HTMLElement);
    }
  }

  private _onItemClick = (ev: React.MouseEvent<HTMLElement>): void => {
    const { item, onItemClick } = this.props;
    if (onItemClick) {
      onItemClick(item, ev);
    }
  }

  private _onItemMouseLeave = (ev: React.MouseEvent<HTMLElement>): void => {
    const { item, onItemMouseLeave } = this.props;
    if (onItemMouseLeave) {
      onItemMouseLeave(item, ev);
    }
  }

  private _onItemKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    const { item, onItemKeyDown } = this.props;
    if (onItemKeyDown) {
      onItemKeyDown(item, ev);
    }
  }

  private _getSubMenuId = (item: IContextualMenuItem): string | undefined => {
    const { getSubMenuId } = this.props;
    if (getSubMenuId) {
      return getSubMenuId(item);
    }
  }
}