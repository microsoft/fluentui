import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';
import type { ButtonProps, ButtonSlots, ButtonState } from '../Button/Button.types';

export type CompoundButtonSlots = ButtonSlots & {
  /**
   * Second line of text that describes the action this button takes.
   */
  secondaryContent?: IntrinsicShorthandProps<'span'>;

  /**
   * Container that wraps the children and secondaryContent slots.
   */
  contentContainer: IntrinsicShorthandProps<'span'>;
};

export type CompoundButtonProps = ButtonProps & ComponentProps<CompoundButtonSlots>;

export interface CompoundButtonState extends ComponentState<CompoundButtonSlots>, Omit<ButtonState, 'components'> {}
