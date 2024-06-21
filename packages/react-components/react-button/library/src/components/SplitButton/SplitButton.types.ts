import { Button } from '../Button/Button';
import { MenuButton } from '../MenuButton/MenuButton';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { ButtonProps } from '../Button/Button.types';
import { MenuButtonProps } from '../MenuButton/MenuButton.types';

export type SplitButtonSlots = {
  /**
   * Root of the component that wraps the primary action button and menu button.
   */
  root: NonNullable<Slot<'div'>>;

  /**
   * Button that opens menu with secondary actions in SplitButton.
   */
  menuButton?: Slot<typeof MenuButton>;
  /**
   * Button to perform primary action in SplitButton.
   */
  primaryActionButton?: Slot<typeof Button>;
};

export type SplitButtonProps = ComponentProps<SplitButtonSlots> &
  Pick<ButtonProps, 'appearance' | 'disabledFocusable' | 'disabled' | 'shape' | 'size' | 'iconPosition' | 'icon'> &
  Pick<MenuButtonProps, 'menuIcon'>;

export type SplitButtonState = ComponentState<SplitButtonSlots> &
  Pick<SplitButtonProps, 'appearance' | 'disabledFocusable' | 'disabled' | 'shape' | 'size' | 'iconPosition'>;
