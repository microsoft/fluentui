import type { ComponentProps, ComponentState, IntrinsicSlotProps, ObjectSlotProps } from '@fluentui/react-utilities';
import type { ButtonProps, ButtonState } from '../Button/Button.types';
import type { MenuButtonProps, MenuButtonState } from '../MenuButton/MenuButton.types';

export type SplitButtonSlots = {
  /**
   * Root of the component that wraps the primary action button and menu button.
   */
  root: IntrinsicSlotProps<'div'>;

  /**
   * Button that opens menu with secondary actions in SplitButton.
   */
  menuButton?: ObjectSlotProps<MenuButtonProps>;

  /**
   * Button to perform primary action in SplitButton.
   */
  primaryActionButton?: ObjectSlotProps<ButtonProps>;
};

export type SplitButtonProps = ComponentProps<SplitButtonSlots> &
  Omit<ButtonProps, 'root'> &
  Omit<MenuButtonProps, 'root'>;

export type SplitButtonState = ComponentState<SplitButtonSlots> &
  Omit<ButtonState, 'components' | 'iconOnly' | 'root'> &
  Omit<MenuButtonState, 'components' | 'iconOnly' | 'root'>;
