import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { ARIAButtonSlotProps } from '@fluentui/react-aria';
import { ButtonProps, ButtonSlots, ButtonState } from '@fluentui/react-button';

export type CarouselButtonSlots = ButtonSlots & {
  root: NonNullable<Slot<ARIAButtonSlotProps<'a'>>>;
};

/**
 * CarouselButton Props
 */
export type CarouselButtonProps = ButtonProps &
  ComponentProps<CarouselButtonSlots> & {
    navType: 'prev' | 'next';
  };

/**
 * State used in rendering CarouselButton
 */
export type CarouselButtonState = ButtonState &
  ComponentState<CarouselButtonSlots> &
  Pick<CarouselButtonProps, 'navType'>;
