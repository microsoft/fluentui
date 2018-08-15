import * as React from 'react';
import { hasSubmenu, getIsChecked } from '../../utilities/contextualMenu/index';
import { BaseComponent, getRTL } from '../../Utilities';
import { Icon } from '../../Icon';
import { IContextualMenuItemProps, IContextualMenuItemStyles, IMenuItemClassNames } from './ContextualMenuItem.types';
import { IProcessedStyleSet } from '@uifabric/styling';

export class ContextualMenuItemBase extends BaseComponent<IContextualMenuItemProps, {}> {
  private _classNames: IProcessedStyleSet<IContextualMenuItemStyles> | IMenuItemClassNames;

  public render() {
    const { item, classNames } = this.props;

    this._classNames = classNames;

    return (
      <div className={item.split ? this._classNames.linkContentMenu : this._classNames.linkContent}>
        {this._renderCheckMarkIcon()}
        {this._renderItemIcon()}
        {this._renderItemName()}
        {this._renderSecondaryText()}
        {this._renderSubMenuIcon()}
      </div>
    );
  }

  public openSubMenu = (): void => {
    const { item, openSubMenu, getSubmenuTarget } = this.props;
    if (getSubmenuTarget) {
      const submenuTarget = getSubmenuTarget();
      if (hasSubmenu(item) && openSubMenu && submenuTarget) {
        openSubMenu(item, submenuTarget);
      }
    }
  };

  public dismissSubMenu = (): void => {
    const { item, dismissSubMenu } = this.props;
    if (hasSubmenu(item) && dismissSubMenu) {
      dismissSubMenu();
    }
  };

  public dismissMenu = (dismissAll?: boolean): void => {
    const { dismissMenu } = this.props;
    if (dismissMenu) {
      dismissMenu(undefined /* ev */, dismissAll);
    }
  };

  private _renderCheckMarkIcon() {
    const { onCheckmarkClick, item } = this.props;

    const isItemChecked = getIsChecked(item);
    if (onCheckmarkClick) {
      const onClick = (e: React.MouseEvent<HTMLElement>) => onCheckmarkClick(item, e);

      return (
        <Icon
          iconName={isItemChecked ? 'CheckMark' : ''}
          className={this._classNames.checkmarkIcon}
          onClick={onClick}
        />
      );
    }
    return null;
  }

  private _renderItemIcon() {
    const { item, hasIcons } = this.props;

    const { iconProps } = item;

    if (!hasIcons) {
      return null;
    }

    if (item.onRenderIcon) {
      return item.onRenderIcon(this.props);
    }

    return <Icon {...iconProps} className={this._classNames.icon} />;
  }

  private _renderItemName() {
    const { item } = this.props;

    if (item.text || item.name) {
      return <span className={this._classNames.label}>{item.text || item.name}</span>;
    }

    return null;
  }

  private _renderSecondaryText() {
    const { item } = this.props;

    if (item.secondaryText) {
      return <span className={this._classNames.secondaryText}>{item.secondaryText}</span>;
    }

    return null;
  }

  private _renderSubMenuIcon() {
    const { item } = this.props;

    if (hasSubmenu(item)) {
      return (
        <Icon
          iconName={getRTL() ? 'ChevronLeft' : 'ChevronRight'}
          {...item.submenuIconProps}
          className={this._classNames.subMenuIcon}
        />
      );
    }
    return null;
  }
}
