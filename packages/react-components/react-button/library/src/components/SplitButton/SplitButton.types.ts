import type { Button } from '../Button/Button';
import type { MenuButton } from '../MenuButton/MenuButton';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { ButtonBaseProps, ButtonProps, ButtonState } from '../Button/Button.types';
import type { MenuButtonBaseProps, MenuButtonProps, MenuButtonState } from '../MenuButton/MenuButton.types';

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

export type SplitButtonState = ComponentState<SplitButtonSlots> &
  Omit<ButtonState, 'components' | 'iconOnly' | 'root'> &
  Omit<MenuButtonState, 'components' | 'iconOnly' | 'root'>;

export type SplitButtonBaseSlots = {
  /**
   * Root of the component that wraps the primary action button and menu button.
   */
  root: NonNullable<Slot<'div'>>;

  /**
   * Button that opens menu with secondary actions in SplitButton.
   */
  menuButton?: Slot<MenuButtonBaseProps>;
  /**
   * Button to perform primary action in SplitButton.
   */
  primaryActionButton?: Slot<ButtonBaseProps>;
};

/**
 * SplitButton props without the `appearance`/`size`/`shape` styling props, for headless usage.
 */
export type SplitButtonBaseProps = ComponentProps<SplitButtonBaseSlots> &
  Omit<ButtonBaseProps, 'root' | 'as'> &
  Omit<MenuButtonBaseProps, 'root' | 'as'>;

/**
 * SplitButton state without the `appearance`/`size`/`shape` styling props, for headless usage.
 */
export type SplitButtonBaseState = Omit<
  ComponentState<SplitButtonBaseSlots>,
  'components' | 'menuButton' | 'primaryActionButton'
> &
  Required<Pick<SplitButtonBaseProps, 'disabled' | 'disabledFocusable' | 'iconPosition'>> & {
    components: {
      root: 'div';
    };
    menuButton: MenuButtonBaseProps;
    primaryActionButton: ButtonBaseProps;
  };
