import * as React from "react";
import { getIsChecked, hasSubmenu } from "../ContextualMenu";
import {} from "../Con";
import { getRTL } from "../../Utilities";
import { Icon } from "../../Icon";
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
      {hasIcons ? this._renderIcon(item, classNames) : null}
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
