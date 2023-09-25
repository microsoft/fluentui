import * as React from 'react';
import { hasSubmenu, getIsChecked } from '../../utilities/contextualMenu/index';
import { getRTL, initializeComponentRef } from '../../Utilities';
import { Icon } from '../../Icon';
import type { IContextualMenuItemProps, IContextualMenuItemRenderFunctions } from './ContextualMenuItem.types';

const defaultIconRenderer = (props: IContextualMenuItemProps) => {
  const { item, classNames } = props;
  const { iconProps } = item;
  return <Icon {...iconProps} className={classNames.icon} />;
};

const renderItemIcon = (props: IContextualMenuItemProps) => {
  const { item, hasIcons } = props;
  if (!hasIcons) {
    return null;
  }

  if (item.onRenderIcon) {
    return item.onRenderIcon(props, defaultIconRenderer);
  }

  return defaultIconRenderer(props);
};

const renderCheckMarkIcon = ({ onCheckmarkClick, item, classNames }: IContextualMenuItemProps) => {
  const isItemChecked = getIsChecked(item);
  if (onCheckmarkClick) {
    // Ensures that the item is passed as the first argument to the checkmark click callback.
    const onClick = (e: React.MouseEvent<HTMLElement>) => onCheckmarkClick(item, e);

    return (
      <Icon
        iconName={item.canCheck !== false && isItemChecked ? 'CheckMark' : ''}
        className={classNames.checkmarkIcon}
        // eslint-disable-next-line react/jsx-no-bind
        onClick={onClick}
      />
    );
  }
  return null;
};

const renderItemName = ({ item, classNames }: IContextualMenuItemProps) => {
  /* eslint-disable deprecation/deprecation */
  if (item.text || item.name) {
    return <span className={classNames.label}>{item.text || item.name}</span>;
  }
  /* eslint-enable deprecation/deprecation */
  return null;
};

const renderSecondaryText = ({ item, classNames }: IContextualMenuItemProps) => {
  if (item.secondaryText) {
    return <span className={classNames.secondaryText}>{item.secondaryText}</span>;
  }
  return null;
};

const renderSubMenuIcon = ({ item, classNames, theme }: IContextualMenuItemProps) => {
  if (hasSubmenu(item)) {
    return (
      <Icon
        iconName={getRTL(theme) ? 'ChevronLeft' : 'ChevronRight'}
        {...item.submenuIconProps}
        className={classNames.subMenuIcon}
      />
    );
  }
  return null;
};

export class ContextualMenuItemBase extends React.Component<IContextualMenuItemProps, {}> {
  constructor(props: IContextualMenuItemProps) {
    super(props);

    initializeComponentRef(this);
  }

  public render() {
    const { item, classNames } = this.props;
    const renderContent = item.onRenderContent || this._renderLayout;

    return (
      <div className={item.split ? classNames.linkContentMenu : classNames.linkContent}>
        {renderContent(this.props, {
          renderCheckMarkIcon,
          renderItemIcon,
          renderItemName,
          renderSecondaryText,
          renderSubMenuIcon,
        })}
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

  private _renderLayout(props: IContextualMenuItemProps, defaultRenders: IContextualMenuItemRenderFunctions) {
    return (
      <>
        {defaultRenders.renderCheckMarkIcon(props)}
        {defaultRenders.renderItemIcon(props)}
        {defaultRenders.renderItemName(props)}
        {defaultRenders.renderSecondaryText(props)}
        {defaultRenders.renderSubMenuIcon(props)}
      </>
    );
  }
}
