import { ARIAButtonSlotProps } from '@fluentui/react-aria';
import { PopoverContextValue } from '@fluentui/react-popover';
import type { ComponentState, ComponentProps, DistributiveOmit, Slot } from '@fluentui/react-utilities';

export type TeachingPopoverCarouselNavButtonSlots = {
  /**
   * ARIA compliant nav buttons used to jump to pages
   */
  root: NonNullable<Slot<ARIAButtonSlotProps<'a'>>>;
};

/**
 * TeachingPopoverCarouselNavButton Props
 */
export type TeachingPopoverCarouselNavButtonProps = ComponentProps<TeachingPopoverCarouselNavButtonSlots>;

/**
 * TeachingPopoverCarouselNavButton State
 */
export type TeachingPopoverCarouselNavButtonState = ComponentState<TeachingPopoverCarouselNavButtonSlots> & {
  /**
   * Enables selection state control
   */
  isSelected?: boolean;
} & Pick<PopoverContextValue, 'appearance'>;

export type TeachingPopoverCarouselNavButtonBaseProps = TeachingPopoverCarouselNavButtonProps;

export type TeachingPopoverCarouselNavButtonBaseState = DistributiveOmit<
  TeachingPopoverCarouselNavButtonState,
  'appearance'
>;
