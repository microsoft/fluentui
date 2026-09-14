import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { ARIAButtonSlotProps } from '@fluentui/react-aria';
import type { ButtonProps, ButtonSlots, ButtonState } from '@fluentui/react-button';

export type CarouselButtonSlots = ButtonSlots & {
  root: NonNullable<Slot<ARIAButtonSlotProps>>;
};

/**
 * CarouselButton Props
 */
export type CarouselButtonProps = Partial<ButtonProps> &
  ComponentProps<CarouselButtonSlots> & {
    /**
     * Dictates whether button will be of type go next or go previous
     * Default: 'next'
     */
    navType?: 'prev' | 'next';
  };

/**
 * State used in rendering CarouselButton
 */
export type CarouselButtonState = ButtonState &
  ComponentState<CarouselButtonSlots> &
  Required<Pick<CarouselButtonProps, 'navType'>>;
