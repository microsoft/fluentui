import * as React from 'react';
import { hasSubmenu, getIsChecked } from '../../utilities/contextualMenu/index';
import { getRTL } from '../../Utilities';
import { Icon } from '../../Icon';
import { IContextualMenuItemProps } from './ContextualMenuItem.types';

const renderItemIcon = (props: IContextualMenuItemProps) => {
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
};

const renderCheckMarkIcon = ({ onCheckmarkClick, item, classNames }: IContextualMenuItemProps) => {
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
};

const renderItemName = ({ item, classNames }: IContextualMenuItemProps) => {
  if (item.name) {
    return <span className={ classNames.label }>{ item.name }</span>;
  }
  return null;
};

const renderSubMenuIcon = ({ item, classNames }: IContextualMenuItemProps) => {
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
};

export const ContextualMenuItem: React.StatelessComponent<IContextualMenuItemProps> = (props) => {
  const { item, classNames } = props;

  return (
    <div
      className={
        item.split ? classNames.linkContentMenu : classNames.linkContent
      }
    >
      { renderCheckMarkIcon(props) }
      { renderItemIcon(props) }
      { renderItemName(props) }
      { renderSubMenuIcon(props) }
    </div>
  );
};
