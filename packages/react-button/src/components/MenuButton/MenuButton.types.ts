import { ShorthandProps } from '@fluentui/react-compose/lib/next/index';
import { ButtonProps, ButtonState, ButtonTokenSet } from '../Button/Button.types';
import { ExpandedState } from './useExpanded';

export type MenuButtonProps = Omit<ButtonProps, 'iconPosition' | 'loader'> & {
  /**
   * Menu that is displayed when the button is pressed.
   */
  menu?: ShorthandProps;

  /**
   * Menu icon that indicates that this button has a menu that can be expanded.
   */
  menuIcon?: ShorthandProps;

  /**
   * Defines the inital expanded state of the MenuButton. Use this if you want the MenuButton to maintain its own state.
   * Mutually exclusive with `expanded`.
   * @defaultvalue false
   */
  defaultExpanded?: boolean;

  /**
   * Defines whether the MenuButton is in an expanded state. Use this if you wish to have the expanded state of the
   * MenuButton be controlled. Mutually exclusive with `defaultExpanded`.
   * @defaultvalue defaultExpanded
   */
  expanded?: boolean;

  /**
   * Defines a callback that runs after the MenuButton's contextual menu has been dismissed.
   */
  onMenuDismiss?: () => void;
};

export interface MenuButtonState extends MenuButtonProps, Omit<ButtonState, 'iconPosition' | 'loader'> {
  menu: ExpandedState['menu'];
}

export type MenuButtonTokens = ButtonTokenSet;
