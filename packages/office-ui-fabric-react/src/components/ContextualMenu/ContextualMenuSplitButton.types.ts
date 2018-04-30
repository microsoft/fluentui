
import { IContextualMenuItem } from '../../ContextualMenu';
import { IMenuItemClassNames } from './ContextualMenu.classNames';
import { IContextualMenuItemProps } from './ContextualMenuItem.types';
import { ContextualMenuSplitButton } from './ContextualMenuSplitButton';

export interface IContextualMenuSplitButtonProps extends React.Props<IContextualMenuItem> {
  /**
   * Optional callback to access the ContextualmenuSplitButton interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: ContextualMenuSplitButton | null) => void;

  /**
   * The item that is used to render the split button.
   */
  item: IContextualMenuItem;

  /**
   * CSS class to apply to the context menu.
   */
  classNames: IMenuItemClassNames;

  /**
   * The index number of the split button among all items in the contextual menu including things like dividers and headers.
   */
  index: number;

  /**
   * The index number of the split button among all items in the contextual menu excluding dividers and headers.
   */
  focusableElementIndex: number;

  /**
   * The total number of items in the contextual menu.
   */
  totalItemCount: number;

  /**
   * Whether or not if the item for the split button uses checkmarks.
   */
  hasCheckmarks?: boolean;

  /**
   * Whether or not the item for the split button uses icons.
   */
  hasIcons?: boolean;

  /**
   * Method to override the render of the individual menu items.
   * @default ContextualMenuItem
   */
  contextualMenuItemAs?: React.ComponentClass<IContextualMenuItemProps> | React.StatelessComponent<IContextualMenuItemProps>;

  /**
   * Callback for when the user's mouse enters the split button.
   */
  onItemMouseEnter?: (item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement>, target: HTMLElement) => boolean | void;

  /**
   * Callback for when the user's mouse leaves the split button.
   */
  onItemMouseLeave?: (item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement>) => void;

  /**
   * Callback for when the user's mouse moves in the split button.
   */
  onItemMouseMove?: (item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement>, target: HTMLElement) => void;

  /**
   * Callback for the mousedown event on the icon button in the split menu.
   */
  onItemMouseDown?: (item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement>) => void;

  /**
   * Callback for when the click event on the primary button.
   */
  executeItemClick?: (item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void;

  /**
   * Callback for when the click event on the icon button from the split button.
   */
  onItemClick?: (item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void;

  /**
   * Callback for when the click event on the icon button which also takes in a specific HTMLElement that will be focused.
   */
  onItemClickBase?: (item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, target: HTMLElement) => void;

  /**
   * Callback for keyboard events on the split button.
   */
  onItemKeyDown?: (item: IContextualMenuItem, ev: React.KeyboardEvent<HTMLElement>) => void;
}