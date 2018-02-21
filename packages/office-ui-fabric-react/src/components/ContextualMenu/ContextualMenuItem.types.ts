import { ContextualMenuItem } from './ContextualMenuItem';
import { IContextualMenuItem } from './ContextualMenu.types';
import { IMenuItemClassNames } from './ContextualMenu.classNames';

export interface IContextualMenuItemProps
  extends React.HTMLAttributes<IContextualMenuItemProps> {
  item: IContextualMenuItem;
  classNames: IMenuItemClassNames;
  index: number;
  hasIcons: boolean | undefined;
  onCheckmarkClick?: ((item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement>) => void);
}
