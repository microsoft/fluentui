import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';
import type { ButtonCommons, ButtonSlots, ButtonState } from '../Button/Button.types';

export type CompoundButtonSlots = ButtonSlots & {
  /**
   * Second line of text that describes the action this button takes.
   */
  secondaryContent?: IntrinsicShorthandProps<'span'>;

  /**
   * Container that wraps the children and the secondaryContent slot.
   */
  contentContainer: IntrinsicShorthandProps<'span'>;
};

export type CompoundButtonProps = ComponentProps<CompoundButtonSlots> & Partial<ButtonCommons>;

export type CompoundButtonState = ComponentState<CompoundButtonSlots> &
  Omit<ButtonState, keyof ButtonSlots | 'components'>;
