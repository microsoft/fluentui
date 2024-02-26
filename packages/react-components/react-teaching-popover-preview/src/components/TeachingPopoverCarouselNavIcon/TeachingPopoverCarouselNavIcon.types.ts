import { PopoverContextValue } from '@fluentui/react-popover';
import type { ComponentState, ComponentProps, Slot } from '@fluentui/react-utilities';

export type TeachingPopoverCarouselNavIconSlots = {
  /**
   * The root slot of the TeachingPopoverCarouselNavIcon.
   * Default html element is div
   */
  root: NonNullable<Slot<'div'>>;
  /**
   * ARIA compliant nav buttons used to jump to pages
   */
  navButton: NonNullable<Slot<'button'>>;
};

/**
 * TeachingPopoverCarouselNavIcon Props
 */
export type TeachingPopoverCarouselNavIconProps = ComponentProps<Partial<TeachingPopoverCarouselNavIconSlots>> & {
  /**
   * The page index that will be used to update carousel context
   */
  index: number;
};

/**
 * TeachingPopoverCarouselNavIcon State
 */
export type TeachingPopoverCarouselNavIconState = ComponentState<TeachingPopoverCarouselNavIconSlots> & {
  /**
   * Enables selection state control
   */
  isSelected?: boolean;
} & Pick<PopoverContextValue, 'appearance'>;
