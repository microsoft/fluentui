import type {
  TeachingPopoverTitleProps as TeachingPopoverTitleBaseProps,
  TeachingPopoverTitleState as TeachingPopoverTitleBaseState,
} from '@fluentui/react-headless-components-preview/teaching-popover';
import type { PopoverState } from '../../Popover/Popover/Popover.types';
export type { TeachingPopoverTitleSlots } from '@fluentui/react-headless-components-preview/teaching-popover';

export type TeachingPopoverTitleProps = TeachingPopoverTitleBaseProps;
export type TeachingPopoverTitleState = TeachingPopoverTitleBaseState &
  Pick<PopoverState, 'appearance'> & {
    root: TeachingPopoverTitleBaseState['root'] & { 'data-appearance'?: PopoverState['appearance'] };
  };
