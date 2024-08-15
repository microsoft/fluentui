import { ARIAButtonSlotProps } from '@fluentui/react-aria';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CarouselNavImageButtonSlots = {
  /**
   * ARIA compliant nav buttons used to jump to pages
   */
  root: NonNullable<Slot<ARIAButtonSlotProps>>;
  /**
   * Required: The image within the button
   */
  image: Slot<'img'>;
};

/**
 * CarouselNavImageButton Props
 */
export type CarouselNavImageButtonProps = ComponentProps<CarouselNavImageButtonSlots> & {};

/**
 * State used in rendering CarouselNavImageButton
 */
export type CarouselNavImageButtonState = ComponentState<CarouselNavImageButtonSlots> & {
  /**
   * Enables selection state control
   */
  selected?: boolean;
};
