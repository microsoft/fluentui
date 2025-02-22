import { ARIAButtonSlotProps } from '@fluentui/react-aria';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { CarouselNavState } from '../CarouselNav/CarouselNav.types';

export type CarouselNavButtonSlots = {
  /**
   * ARIA compliant nav buttons used to jump to pages
   */
  root: NonNullable<Slot<ARIAButtonSlotProps>>;
};

/**
 * CarouselNavButton Props
 */
export type CarouselNavButtonProps = ComponentProps<CarouselNavButtonSlots> & {};

/**
 * State used in rendering CarouselNavButton
 */
export type CarouselNavButtonState = ComponentState<CarouselNavButtonSlots> & {
  /**
   * Enables selection state control
   */
  selected?: boolean;
} & Pick<CarouselNavState, 'appearance'>;
