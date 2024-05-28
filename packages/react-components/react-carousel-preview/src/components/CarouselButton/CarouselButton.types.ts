import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { ARIAButtonSlotProps } from '@fluentui/react-aria';
import { ButtonProps, ButtonSlots, ButtonState } from '@fluentui/react-button';

export type CarouselButtonSlots = ButtonSlots & {
  root: NonNullable<Slot<ARIAButtonSlotProps>>;
};

/**
 * CarouselButton Props
 */
export type CarouselButtonProps = ButtonProps &
  ComponentProps<CarouselButtonSlots> & {
    /**
     * Dictates whether button will be of type go next or go previous
     */
    navType: 'prev' | 'next';
  };

/**
 * State used in rendering CarouselButton
 */
export type CarouselButtonState = ButtonState &
  ComponentState<CarouselButtonSlots> &
  Pick<CarouselButtonProps, 'navType'>;
