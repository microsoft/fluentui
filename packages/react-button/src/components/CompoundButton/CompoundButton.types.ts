import type { ComponentProps, ComponentState, IntrinsicSlotProps } from '@fluentui/react-utilities';
import type { ButtonCommonsUnstable, ButtonSlots, ButtonState } from '../Button/Button.types';

export type CompoundButtonSlots = ButtonSlots & {
  /**
   * Second line of text that describes the action this button takes.
   */
  secondaryContent?: IntrinsicSlotProps<'span'>;

  /**
   * Container that wraps the children and the secondaryContent slot.
   */
  contentContainer: IntrinsicSlotProps<'span'>;
};

export type CompoundButtonProps = ComponentProps<CompoundButtonSlots> & Partial<ButtonCommonsUnstable>;

export type CompoundButtonState = ComponentState<CompoundButtonSlots> &
  Omit<ButtonState, keyof ButtonSlots | 'components'>;
