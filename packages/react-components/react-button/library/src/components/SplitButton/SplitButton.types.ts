import { Button } from '../Button/Button';
import { MenuButton } from '../MenuButton/MenuButton';
import type { ComponentProps, ComponentState, DistributiveOmit, Slot } from '@fluentui/react-utilities';
import type { ButtonDesignPropNames, ButtonProps, ButtonState } from '../Button/Button.types';
import type { MenuButtonProps, MenuButtonState } from '../MenuButton/MenuButton.types';

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
  Omit<ButtonProps, 'root' | 'as'> &
  Omit<MenuButtonProps, 'root' | 'as'>;

export type SplitButtonBaseProps = DistributiveOmit<SplitButtonProps, ButtonDesignPropNames>;

export type SplitButtonState = ComponentState<SplitButtonSlots> &
  Omit<ButtonState, 'components' | 'iconOnly' | 'root'> &
  Omit<MenuButtonState, 'components' | 'iconOnly' | 'root'>;

export type SplitButtonBaseState = DistributiveOmit<SplitButtonState, ButtonDesignPropNames>;
