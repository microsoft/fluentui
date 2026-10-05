import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { ButtonBaseProps, ButtonBaseState, ButtonProps, ButtonSlots, ButtonState } from '../Button/Button.types';

export type CompoundButtonSlots = ButtonSlots & {
  /**
   * Second line of text that describes the action this button takes.
   */
  secondaryContent?: Slot<'span'>;

  /**
   * Container that wraps the children and the secondaryContent slot.
   */
  contentContainer: NonNullable<Slot<'span'>>;
};

export type CompoundButtonBaseProps = ComponentProps<Partial<CompoundButtonSlots>> &
  Pick<ButtonBaseProps, 'disabledFocusable' | 'disabled' | 'iconPosition'>;

export type CompoundButtonProps = CompoundButtonBaseProps & Pick<ButtonProps, 'appearance' | 'shape' | 'size'>;

export type CompoundButtonBaseState = ComponentState<CompoundButtonSlots> &
  Omit<ButtonBaseState, keyof ButtonSlots | 'components'>;

export type CompoundButtonState = CompoundButtonBaseState & Pick<ButtonState, 'appearance' | 'shape' | 'size'>;
