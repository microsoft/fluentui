import { IContextualMenuItem } from '../../ContextualMenu';
import { IContextualMenuItemWrapperProps } from './ContextualMenuItemWrapper.types';
import { ContextualMenuAnchor } from './ContextualMenuAnchor';

export interface IContextualMenuAnchorProps extends IContextualMenuItemWrapperProps {
  /**
   * Optional callback to access the ContextualMenuAnchor interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: ContextualMenuAnchor | null) => void;

  /**
   * Callback to get the subMenu ID for an IContextualMenuItem.
   */
  getSubMenuId?: (item: IContextualMenuItem) => string | undefined;

  /**
   * Key of the currently expanded subMenu.
   */
  expandedMenuItemKey?: string;
}