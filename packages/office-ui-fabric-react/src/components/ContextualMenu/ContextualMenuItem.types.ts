import { IContextualMenuItem } from './ContextualMenu.types';
import { IMenuItemClassNames } from './ContextualMenu.classNames';

export interface IContextualMenuItemProps
  extends React.HTMLAttributes<IContextualMenuItemProps> {

  /**
   * The item to display
   */
  item: IContextualMenuItem;

  /**
   * Classnames for different aspects of a menu item
   */
  classNames: IMenuItemClassNames;

  /**
   * Index of the item
   */
  index: number;

  /**
   * If this item has icons
   */
  hasIcons: boolean | undefined;

  /**
   * Click handler for the checkmark
   */
  onCheckmarkClick?: ((item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement>) => void);
}
