import { ContextualMenuItemChildren } from "./ContextualMenuItemChildren";
import { IContextualMenuItem } from "../ContextualMenu/ContextualMenu.types";
import { IMenuItemClassNames } from "../ContextualMenu/ContextualMenu.classNames";

export interface IContextualMenuItemChildrenProps
  extends React.Props<IContextualMenuItemChildrenProps> {
  item: IContextualMenuItem;
  classNames: IMenuItemClassNames;
  index: number;
  hasCheckmarks: boolean | undefined;
  hasIcons: boolean | undefined;
}
