import { ARIAButtonSlotProps } from '@fluentui/react-aria';
import { ButtonProps, ButtonSlots, ButtonState } from '@fluentui/react-button';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CarouselAutoplayButtonSlots = ButtonSlots & {
  root: NonNullable<Slot<ARIAButtonSlotProps>>;
};

/**
 * CarouselAutoplayButton Props
 */
export type CarouselAutoplayButtonProps = ButtonProps &
  ComponentProps<CarouselAutoplayButtonSlots> & {
    /**
     * Controls whether autoplay will initialized as true or false
     * Default: true
     */
    defaultAutoplay?: boolean;

    /**
     * User controlled autoplay state
     */
    autoplay?: boolean;
  };

/**
 * State used in rendering CarouselAutoplayButton
 */
export type CarouselAutoplayButtonState = ButtonState &
  ComponentState<CarouselAutoplayButtonSlots> &
  Pick<CarouselAutoplayButtonProps, 'defaultAutoplay' | 'autoplay'>;
