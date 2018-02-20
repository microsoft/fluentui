import { ContextualMenuItemChildren } from "./ContextualMenuItemChildren";
import { IContextualMenuItem } from "./ContextualMenu.types";
import { IMenuItemClassNames } from "./ContextualMenu.classNames";

export interface IContextualMenuItemChildrenProps
  extends React.Props<IContextualMenuItemChildrenProps> {
  item: IContextualMenuItem;
  classNames: IMenuItemClassNames;
  index: number;
  hasIcons: boolean | undefined;
  onCheckmarkClick?: ((item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement>) => void);
}
