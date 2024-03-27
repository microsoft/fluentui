import { ARIAButtonSlotProps } from '@fluentui/react-aria';
import { PopoverContextValue } from '@fluentui/react-popover';
import type { ComponentState, ComponentProps, Slot } from '@fluentui/react-utilities';

export type TeachingPopoverCarouselNavButtonSlots = {
  /**
   * ARIA compliant nav buttons used to jump to pages
   */
  root: NonNullable<Slot<ARIAButtonSlotProps<'a'>>>;
};

/**
 * TeachingPopoverCarouselNavButton Props
 */
export type TeachingPopoverCarouselNavButtonProps = ComponentProps<Partial<TeachingPopoverCarouselNavButtonSlots>> & {
  /**
   * The page index that will be used to update carousel context
   */
  index: number;
};

/**
 * TeachingPopoverCarouselNavButton State
 */
export type TeachingPopoverCarouselNavButtonState = ComponentState<TeachingPopoverCarouselNavButtonSlots> & {
  /**
   * Enables selection state control
   */
  isSelected?: boolean;
} & Pick<PopoverContextValue, 'appearance'>;
