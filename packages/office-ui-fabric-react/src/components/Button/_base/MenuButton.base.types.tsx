import * as React from 'react';
import { IButtonBaseProps, IButtonBase } from './Button.base.types';
import { IRenderFunction } from '../../../Utilities';
import { IContextualMenuProps } from '../../../ContextualMenu';

export interface IMenuButtonBase extends IButtonBase {
  /**
   * If there is a menu associated with this button and it is visible, this will dismiss the menu
   */
  dismissMenu: () => void;
}

export interface IMenuButtonBaseProps extends IButtonBaseProps {
  /**
   * Optional callback to access the IButton interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IMenuButtonBase) => void;

  /**
   * Props for button menu. Providing this will default to showing the menu icon. See menuIconProps for overriding
   * how the default icon looks. Providing this in addition of onClick and setting the split property to true will render a SplitButton.
   */
  menuProps?: IContextualMenuProps;

  /**
   * Optional callback when menu is clicked.
   */
  onMenuClick?: (ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, button?: IMenuButtonBaseProps) => void;

  /**
  * Custom render function for button menu
  */
  onRenderMenu?: IRenderFunction<IContextualMenuProps>;

  /**
 * Any custom data the developer wishes to associate with the menu item.
 */
  data?: any;
}
