import * as React from "react";
import { getIsChecked, hasSubmenu } from "../ContextualMenu";
import { IContextualMenuItem } from "../ContextualMenu";
import { IMenuItemClassNames } from "../ContextualMenu/ContextualMenu.classNames";
import { getRTL } from "../../Utilities";
import { Icon, IIconProps } from "../../Icon";
import { IContextualMenuItemChildrenProps } from "./ContextualMenuItemChildren.types";

export const ContextualMenuItemChildren: React.StatelessComponent<
  IContextualMenuItemChildrenProps
> = (props: IContextualMenuItemChildrenProps) => {
  const { item, classNames, index, hasCheckmarks, hasIcons } = props;

  const isItemChecked: boolean | null | undefined = getIsChecked(item);
  return (
    <div
      className={
        item.split ? classNames.linkContentMenu : classNames.linkContent
      }
    >
      {hasCheckmarks ? (
        <Icon
          iconName={isItemChecked === true ? "CheckMark" : ""}
          className={classNames.checkmarkIcon}
          onClick={this._onItemClick.bind(this, item)}
        />
      ) : null}
      {hasIcons ? renderIcon(item, classNames) : null}
      {item.name ? <span className={classNames.label}>{item.name}</span> : null}
      {hasSubmenu(item) ? (
        <Icon
          iconName={getRTL() ? "ChevronLeft" : "ChevronRight"}
          {...item.submenuIconProps}
          className={classNames.subMenuIcon}
        />
      ) : null}
    </div>
  );
};

const renderIcon = (
  item: IContextualMenuItem,
  classNames: IMenuItemClassNames
) => {
  // Only present to allow continued use of item.icon which is deprecated.
  const iconProps = getIconProps(item);

  return <Icon {...iconProps} className={classNames.icon} />;
};

const getIconProps = (item: IContextualMenuItem): IIconProps => {
  const iconProps: IIconProps = item.iconProps
    ? item.iconProps
    : {
        iconName: item.icon
      };
  return iconProps;
};
