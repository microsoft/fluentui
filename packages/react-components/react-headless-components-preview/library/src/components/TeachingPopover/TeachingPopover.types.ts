import type { PopoverContextValue as BasePopoverContextValue } from '@fluentui/react-popover';
import type { PopoverProps, PopoverState, PopoverContextValue } from '../Popover/Popover.types';

/**
 * TeachingPopover Props
 */
export type TeachingPopoverProps = PopoverProps;

/**
 * TeachingPopover State — identical to the headless Popover state. Styling
 * concerns from `@fluentui/react-teaching-popover` (`appearance`, `trapFocus`,
 * `inline`) are intentionally omitted; consumers control presentation.
 */
export type TeachingPopoverState = PopoverState;

/**
 * Subset of the `@fluentui/react-popover` `PopoverContextValue` that the
 * `@fluentui/react-teaching-popover` base hooks actually read (`toggleOpen`,
 * `setOpen`, `triggerRef`). The other fields fall back to
 * `popoverContextDefaultValue` from `@fluentui/react-popover`.
 */
export type TeachingPopoverBaseBridgedContextValue = Pick<
  BasePopoverContextValue,
  | 'open'
  | 'setOpen'
  | 'toggleOpen'
  | 'triggerRef'
  | 'contentRef'
  | 'arrowRef'
  | 'openOnHover'
  | 'openOnContext'
  | 'withArrow'
>;

export type TeachingPopoverContextValues = {
  popover: PopoverContextValue;
  basePopover: TeachingPopoverBaseBridgedContextValue;
};
