import { IContextualMenuItem } from './ContextualMenu.types';
import { IMenuItemClassNames } from './ContextualMenu.classNames';
import { IStyle, ITheme } from '../../Styling';
import { IRefObject, IStyleFunction } from '../../Utilities';

export interface IContextualMenuRenderItem {
  /**
   * Function to open this item's subMenu, if present.
   */
  openSubMenu: () => void;

  /**
   * Function to close this item's subMenu, if present.
   */
  dismissSubMenu: () => void;

  /**
   * Dismiss the menu this item belongs to.
   */
  dismissMenu: (dismissAll?: boolean) => void;
}

export interface IContextualMenuItemProps extends React.HTMLAttributes<IContextualMenuItemProps> {
  /**
   * Optional callback to access the IContextualMenuRenderItem interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IContextualMenuRenderItem>;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunction<IContextualMenuItemStyleProps, IContextualMenuItemStyles>;

  /**
   * Theme provided by High-Order Component.
   */
  theme?: ITheme;

  /**
   * Additional css class to apply to the ContextualMenuItem
   * @defaultvalue undefined
   */
  className?: string;

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

  /**
   * This prop will get set by ContextualMenu and can be called to open this item's subMenu, if present.
   */
  openSubMenu?: (item: any, target: HTMLElement) => void;

  /**
   * This prop will get set by ContextualMenu and can be called to close this item's subMenu, if present.
   */
  dismissSubMenu?: () => void;

  /**
   * This prop will get set by ContextualMenu and can be called to close the menu this item belongs to.
   * If dismissAll is true, all menus will be closed.
   */
  dismissMenu?: (ev?: any, dismissAll?: boolean) => void;

  /**
   * This prop will get set by the wrapping component and will return the element that wraps this ContextualMenuItem.
   * Used for openSubMenu.
   */
  getSubmenuTarget?: () => HTMLElement | undefined;
}

export interface IContextualMenuItemStyleProps {
  /**
   * Theme provided by High-Order Component.
   */
  theme: ITheme;

  /**
   * Accept custom classNames
   */
  className?: string;

  // Insert ContextualMenuItem style props below
}

export interface IContextualMenuItemStyles {
  /**
   * Style for the root element.
   */
  root: IStyle;

  // Insert ContextualMenuItem classNames below
}
