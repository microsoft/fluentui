import type { PopoverState, PopoverProps, PopoverContextValue } from '@fluentui/react-popover';
import { TeachingPopoverContextValue } from '../../TeachingPopoverContext';

export type TeachingPopoverAppearance = 'brand' | undefined;

/**
 * TeachingPopover Props
 */
export type TeachingPopoverProps = PopoverProps & {};

/**
 * TeachingPopoverContextValues
 * @deprecated in favor of PopoverContext and TeachingPopoverCarouselContext
 */
export type TeachingPopoverContextValues = {
  teachingPopover: TeachingPopoverContextValue;
  popover: PopoverContextValue;
};

/**
 * TeachingPopover State
 */
export type TeachingPopoverState = PopoverState;
