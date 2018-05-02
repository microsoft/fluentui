import * as React from 'react';
import { hasSubmenu, getIsChecked } from '../../utilities/contextualMenu/index';
import { BaseComponent, getRTL } from '../../Utilities';
import { Icon } from '../../Icon';
import { IContextualMenuItemProps } from './ContextualMenuItem.types';

export class ContextualMenuItem extends BaseComponent<IContextualMenuItemProps, {}> {
  public render() {
    const { item, classNames } = this.props;

    return (
      <div
        className={
          item.split ? classNames.linkContentMenu : classNames.linkContent
        }
      >
        { this.renderCheckMarkIcon(this.props) }
        { this.renderItemIcon(this.props) }
        { this.renderItemName(this.props) }
        { this.renderSubMenuIcon(this.props) }
      </div>
    );
  }

  public openSubMenu = (): void => {
    const { item, openSubMenu, subMenuTargetRef } = this.props;
    if (hasSubmenu(item) && openSubMenu && subMenuTargetRef && subMenuTargetRef.current) {
      openSubMenu(item, subMenuTargetRef.current);
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

  private renderItemIcon = (props: IContextualMenuItemProps) => {
    const {
      item,
      hasIcons,
      classNames
    } = props;

    // Only present to allow continued use of item.icon which is deprecated.
    const { iconProps, icon } = item;

    if (!hasIcons) {
      return null;
    }

    if (item.onRenderIcon) {
      return (
        item.onRenderIcon(props)
      );
    }

    if (iconProps) {
      return <Icon { ...iconProps } className={ classNames.icon } />;
    }

    return <Icon iconName={ icon } className={ classNames.icon } />;
  }

  private renderCheckMarkIcon = ({ onCheckmarkClick, item, classNames }: IContextualMenuItemProps) => {
    const isItemChecked = getIsChecked(item);
    if (onCheckmarkClick) {
      const onClick = (e: React.MouseEvent<HTMLElement>) => onCheckmarkClick(item, e);

      return (
        <Icon
          iconName={ isItemChecked ? 'CheckMark' : '' }
          className={ classNames.checkmarkIcon }
          onClick={ onClick }
        />
      );
    }
    return null;
  }

  private renderItemName = ({ item, classNames }: IContextualMenuItemProps) => {
    if (item.name) {
      return <span className={ classNames.label }>{ item.name }</span>;
    }
    return null;
  }

  private renderSubMenuIcon = ({ item, classNames }: IContextualMenuItemProps) => {
    if (hasSubmenu(item)) {
      return (
        <Icon
          iconName={ getRTL() ? 'ChevronLeft' : 'ChevronRight' }
          { ...item.submenuIconProps }
          className={ classNames.subMenuIcon }
        />
      );
    }
    return null;
  }
}
