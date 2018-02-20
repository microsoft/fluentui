import * as React from "react";
import { hasSubmenu, getIsChecked } from '../../utilities/contextMenu';
import { IContextualMenuItem } from "../ContextualMenu";
import { IMenuItemClassNames } from "../ContextualMenu/ContextualMenu.classNames";
import { getRTL } from "../../Utilities";
import { Icon, IIconProps } from "../../Icon";
import { IContextualMenuItemChildrenProps } from "./ContextualMenuItemChildren.types";

export const ContextualMenuItemChildren: React.StatelessComponent<IContextualMenuItemChildrenProps> = (props) => {
  const { item, classNames } = props;

  return (
    <div
      className={
        item.split ? classNames.linkContentMenu : classNames.linkContent
      }
    >
      { renderCheckMarkIcon(props) }
      { renderIcon(props) }
      { renderName(props) }
      { renderSubMenu(props) }
    </div>
  );
};

const renderIcon = ({ hasIcons, item, classNames }: IContextualMenuItemChildrenProps) => {
  // Only present to allow continued use of item.icon which is deprecated.
  const { iconProps, icon } = item;

  if (!hasIcons) {
    return null;
  }

  if (iconProps) {
    return <Icon { ...iconProps } className={ classNames.icon } />
  }

  return <Icon iconName={ icon } className={ classNames.icon } />
};

const renderCheckMarkIcon = ({ onCheckmarkClick, item, classNames }: IContextualMenuItemChildrenProps) => {
  const isItemChecked = getIsChecked(item);

  if (onCheckmarkClick) {
    return <Icon
      iconName={ isItemChecked ? "CheckMark" : "" }
      className={ classNames.checkmarkIcon }
      onClick={ (e) => onCheckmarkClick(item, e) }
    />
  }
  return null;
}

const renderName = ({ item, classNames }: IContextualMenuItemChildrenProps) => {
  if (item.name) {
    return <span className={ classNames.label }>{ item.name }</span>;
  }
  return null;
}

const renderSubMenu = ({ item, classNames }: IContextualMenuItemChildrenProps) => {
  if (hasSubmenu(item)) {
    return <Icon
      iconName={ getRTL() ? "ChevronLeft" : "ChevronRight" }
      { ...item.submenuIconProps }
      className={ classNames.subMenuIcon }
    />
  }
}
