import { PopoverContextValue } from '@fluentui/react-popover';
import type { ComponentState, ComponentProps, Slot } from '@fluentui/react-utilities';

export type TeachingPopoverCarouselNavButtonSlots = {
  /**
   * The root slot of the TeachingPopoverCarouselNavButton.
   * Default html element is div
   */
  root: NonNullable<Slot<'div'>>;
  /**
   * ARIA compliant nav buttons used to jump to pages
   */
  navButton: NonNullable<Slot<'button'>>;
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
