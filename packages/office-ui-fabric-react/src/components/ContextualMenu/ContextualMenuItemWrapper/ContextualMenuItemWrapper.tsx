import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../../Utilities';
import { IContextualMenuItemWrapperProps } from './ContextualMenuItemWrapper.types';
import { IContextualMenuItem } from '../../ContextualMenu';
import { ContextualMenuItemType } from '../ContextualMenu.types';
import { IContextualMenuItemStyleProps, IContextualMenuItemStyles } from '../ContextualMenuItem.types';
import { getIsChecked, isItemDisabled } from '../../../utilities/contextualMenu/index';

const getClassNames = classNamesFunction<IContextualMenuItemStyleProps, IContextualMenuItemStyles>();

export class ContextualMenuItemWrapper extends BaseComponent<IContextualMenuItemWrapperProps, {}> {
  protected _iconProps = this.props.item.iconProps || { iconName: 'None' };

  protected _classNames = getClassNames(this.props.item.styles, {
    theme: this.props.item.theme!,
    className: this.props.item.className,
    disabled: isItemDisabled(this.props.item),
    // expanded: this.state.expandedMenuItemKey === this.props.item.key,
    expanded: false,
    checked: !!getIsChecked(this.props.item),
    isAnchorLink: !!this.props.item.href,
    knownIcon: this._iconProps.iconName !== 'None',
    itemClassName: this.props.item.className,
    dividerClassName:
      this.props.item.itemType === ContextualMenuItemType.Divider ? this.props.item.className : undefined,
    iconClassName: this._iconProps.className,
    subMenuClassName: this.props.item.submenuIconProps ? this.props.item.submenuIconProps.className : '',
    primaryDisabled: this.props.item.primaryDisabled
  });

  protected _onItemMouseEnter = (ev: React.MouseEvent<HTMLElement>): void => {
    const { item, onItemMouseEnter } = this.props;
    if (onItemMouseEnter) {
      onItemMouseEnter(item, ev, ev.currentTarget as HTMLElement);
    }
  };

  protected _onItemClick = (ev: React.MouseEvent<HTMLElement>): void => {
    const { item, onItemClickBase } = this.props;
    if (onItemClickBase) {
      onItemClickBase(item, ev, ev.currentTarget as HTMLElement);
    }
  };

  protected _onItemMouseLeave = (ev: React.MouseEvent<HTMLElement>): void => {
    const { item, onItemMouseLeave } = this.props;
    if (onItemMouseLeave) {
      onItemMouseLeave(item, ev);
    }
  };

  protected _onItemKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    const { item, onItemKeyDown } = this.props;
    if (onItemKeyDown) {
      onItemKeyDown(item, ev);
    }
  };

  protected _onItemMouseMove = (ev: React.MouseEvent<HTMLElement>): void => {
    const { item, onItemMouseMove } = this.props;
    if (onItemMouseMove) {
      onItemMouseMove(item, ev, ev.currentTarget as HTMLElement);
    }
  };

  protected _getSubMenuId = (item: IContextualMenuItem): string | undefined => {
    const { getSubMenuId } = this.props;
    if (getSubMenuId) {
      return getSubMenuId(item);
    }
  };

  protected _getSubmenuTarget = (): HTMLElement | undefined => {
    return undefined;
  };
}
