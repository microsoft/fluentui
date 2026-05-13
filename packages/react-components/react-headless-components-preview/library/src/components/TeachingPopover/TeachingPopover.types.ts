import type { PopoverContextValue as V9PopoverContextValue } from '@fluentui/react-popover';
import type { PopoverProps, PopoverState, PopoverContextValue } from '../Popover/Popover.types';

/**
 * TeachingPopover Props
 */
export type TeachingPopoverProps = PopoverProps;

/**
 * TeachingPopover State — identical to the headless Popover state. Styling
 * concerns from the v9 component (`appearance`, `trapFocus`, `inline`) are
 * intentionally omitted; consumers control presentation.
 */
export type TeachingPopoverState = PopoverState;

/**
 * Subset of the v9 `PopoverContextValue` that the v9 teaching-popover base
 * hooks actually read (`toggleOpen`, `setOpen`, `triggerRef`). The other v9
 * fields fall back to `popoverContextDefaultValue` from `@fluentui/react-popover`.
 */
export type TeachingPopoverV9BridgedContextValue = Pick<
  V9PopoverContextValue,
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
  v9Popover: TeachingPopoverV9BridgedContextValue;
};
