import { IContextualMenuItem } from '../../ContextualMenu';
import { IContextualMenuItemWrapperProps } from './ContextualMenuItemWrapper.types';
import { ContextualMenuButton } from './ContextualMenuButton';

export interface IContextualMenuButtonProps extends IContextualMenuItemWrapperProps {
  /**
   * Optional callback to access the ContextualMenuSplitButton interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: ContextualMenuButton | null) => void;

  /**
   * Callback to get the subMenu ID for an IContextualMenuItem.
   */
  getSubMenuId?: (item: IContextualMenuItem) => string | undefined;

  /**
   * Key of the currently expanded subMenu.
   */
  expandedMenuItemKey?: string;
}