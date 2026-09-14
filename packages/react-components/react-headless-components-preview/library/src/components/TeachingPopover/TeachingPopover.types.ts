import type { PopoverContextValue as BasePopoverContextValue } from '@fluentui/react-popover';
import type { PopoverContextValue } from '../Popover/Popover.types';

/**
 * TeachingPopover Props
 */
export type {
  PopoverProps as TeachingPopoverProps,
  PopoverState as TeachingPopoverState,
} from '../Popover/Popover.types';

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
