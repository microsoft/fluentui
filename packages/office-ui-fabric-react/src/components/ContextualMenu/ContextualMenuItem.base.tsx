import * as React from 'react';
import { hasSubmenu, getIsChecked } from '../../utilities/contextualMenu/index';
import { BaseComponent, getRTL } from '../../Utilities';
import { Icon } from '../../Icon';
import { IContextualMenuItemProps } from './ContextualMenuItem.types';

const renderItemIcon = (props: IContextualMenuItemProps) => {
  const { item, hasIcons, classNames } = props;

  const { iconProps } = item;

  if (!hasIcons) {
    return null;
  }

  if (item.onRenderIcon) {
    return item.onRenderIcon(props);
  }

  return <Icon {...iconProps} className={classNames.icon} />;
};

const renderCheckMarkIcon = ({ onCheckmarkClick, item, classNames }: IContextualMenuItemProps) => {
  const isItemChecked = getIsChecked(item);
  if (onCheckmarkClick) {
    // Ensures that the item is passed as the first argument to the checkmark click callback.
    const onClick = (e: React.MouseEvent<HTMLElement>) => onCheckmarkClick(item, e);

    return <Icon iconName={isItemChecked ? 'CheckMark' : ''} className={classNames.checkmarkIcon} onClick={onClick} />;
  }
  return null;
};

const renderItemName = ({ item, classNames }: IContextualMenuItemProps) => {
  if (item.text || item.name) {
    return <span className={classNames.label}>{item.text || item.name}</span>;
  }
  return null;
};

const renderSecondaryText = ({ item, classNames }: IContextualMenuItemProps) => {
  if (item.secondaryText) {
    return <span className={classNames.secondaryText}>{item.secondaryText}</span>;
  }
  return null;
};

const renderSubMenuIcon = ({ item, classNames }: IContextualMenuItemProps) => {
  if (hasSubmenu(item)) {
    return <Icon iconName={getRTL() ? 'ChevronLeft' : 'ChevronRight'} {...item.submenuIconProps} className={classNames.subMenuIcon} />;
  }
  return null;
};

export class ContextualMenuItemBase extends BaseComponent<IContextualMenuItemProps, {}> {
  public render() {
    const { item, classNames } = this.props;

    return (
      <div className={item.split ? classNames.linkContentMenu : classNames.linkContent}>
        {renderCheckMarkIcon(this.props)}
        {renderItemIcon(this.props)}
        {renderItemName(this.props)}
        {renderSecondaryText(this.props)}
        {renderSubMenuIcon(this.props)}
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
}
