import { IContextualMenuItem } from '../../ContextualMenu';
import { IContextualMenuItemWrapperProps } from './IContextualMenuItemWrapper';

export interface IContextualMenuAnchorProps extends IContextualMenuItemWrapperProps {
  /**
   * Callback to get the subMenu ID for an IContextualMenuItem
   */
  getSubMenuId?: (item: IContextualMenuItem) => string | undefined;

  /**
   * Key of the currently expanded subMenu
   */
  expandedMenuItemKey?: string;
}