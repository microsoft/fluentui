import * as React from 'react';
import { hasSubmenu, getIsChecked, isItemDisabled } from '../../utilities/contextualMenu/index';
import { BaseComponent, classNamesFunction, getRTL } from '../../Utilities';
import { Icon } from '../../Icon';
import { ContextualMenuItemType } from './ContextualMenu.types';
import {
  IContextualMenuItemProps,
  IContextualMenuItemStyleProps,
  IContextualMenuItemStyles
} from './ContextualMenuItem.types';

const getClassNames = classNamesFunction<IContextualMenuItemStyleProps, IContextualMenuItemStyles>();

// const renderItemIcon = (props: IContextualMenuItemProps) => {
//   const { item, hasIcons, classNames } = props;

//   const { iconProps } = item;

//   if (!hasIcons) {
//     return null;
//   }

//   if (item.onRenderIcon) {
//     return item.onRenderIcon(props);
//   }

//   return <Icon {...iconProps} className={classNames.icon} />;
// };

// const renderCheckMarkIcon = ({ onCheckmarkClick, item, classNames }: IContextualMenuItemProps) => {
//   const isItemChecked = getIsChecked(item);
//   if (onCheckmarkClick) {
//     const onClick = (e: React.MouseEvent<HTMLElement>) => onCheckmarkClick(item, e);

//     return <Icon iconName={isItemChecked ? 'CheckMark' : ''} className={classNames.checkmarkIcon} onClick={onClick} />;
//   }
//   return null;
// };

// const renderItemName = ({ item, classNames }: IContextualMenuItemProps) => {
//   if (item.text || item.name) {
//     return <span className={classNames.label}>{item.text || item.name}</span>;
//   }
//   return null;
// };

// const renderSecondaryText = ({ item, classNames }: IContextualMenuItemProps) => {
//   if (item.secondaryText) {
//     return <span className={classNames.secondaryText}>{item.secondaryText}</span>;
//   }
//   return null;
// };

// const renderSubMenuIcon = ({ item, classNames }: IContextualMenuItemProps) => {
//   if (hasSubmenu(item)) {
//     return (
//       <Icon
//         iconName={getRTL() ? 'ChevronLeft' : 'ChevronRight'}
//         {...item.submenuIconProps}
//         className={classNames.subMenuIcon}
//       />
//     );
//   }
//   return null;
// };

export class ContextualMenuItemBase extends BaseComponent<IContextualMenuItemProps, {}> {
  protected _iconProps = this.props.item.iconProps || { iconName: 'None' };

  protected _classNames = getClassNames(this.props.item.styles, {
    theme: this.props.item.theme!,
    className: this.props.item.className,
    disabled: isItemDisabled(this.props.item),
    expanded: true,
    checked: !!getIsChecked(this.props.item),
    isAnchorLink: true,
    knownIcon: this._iconProps.iconName !== 'None',
    itemClassName: this.props.item.className,
    dividerClassName:
      this.props.item.itemType === ContextualMenuItemType.Divider ? this.props.item.className : undefined,
    iconClassName: this._iconProps.className,
    subMenuClassName: this.props.item.submenuIconProps ? this.props.item.submenuIconProps.className : '',
    primaryDisabled: this.props.item.primaryDisabled
  });

  public render() {
    const { item } = this.props;

    return (
      <div className={item.split ? this._classNames.linkContentMenu : this._classNames.linkContent}>
        {this.renderCheckMarkIcon(this.props)}
        {this.renderItemIcon(this.props)}
        {this.renderItemName(this.props)}
        {this.renderSecondaryText(this.props)}
        {this.renderSubMenuIcon(this.props)}
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

  private renderItemIcon = (props: IContextualMenuItemProps) => {
    const { item, hasIcons } = props;

    const { iconProps } = item;

    if (!hasIcons) {
      return null;
    }

    if (item.onRenderIcon) {
      return item.onRenderIcon(props);
    }

    return <Icon {...iconProps} className={this._classNames.icon} />;
  };

  private renderCheckMarkIcon = ({ onCheckmarkClick, item }: IContextualMenuItemProps) => {
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
  };

  private renderItemName = ({ item }: IContextualMenuItemProps) => {
    if (item.text || item.name) {
      return <span className={this._classNames.label}>{item.text || item.name}</span>;
    }
    return null;
  };

  private renderSecondaryText = ({ item }: IContextualMenuItemProps) => {
    if (item.secondaryText) {
      return <span className={this._classNames.secondaryText}>{item.secondaryText}</span>;
    }
    return null;
  };

  private renderSubMenuIcon = ({ item }: IContextualMenuItemProps) => {
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
  };
}
