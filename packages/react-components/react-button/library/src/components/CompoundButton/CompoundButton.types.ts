import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { ButtonProps, ButtonSlots, ButtonState } from '../Button/Button.types';

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

export type CompoundButtonProps = ComponentProps<Partial<CompoundButtonSlots>> &
  Pick<ButtonProps, 'appearance' | 'disabledFocusable' | 'disabled' | 'iconPosition' | 'shape' | 'size'>;

export type CompoundButtonState = ComponentState<CompoundButtonSlots> &
  Omit<ButtonState, keyof ButtonSlots | 'components'>;
