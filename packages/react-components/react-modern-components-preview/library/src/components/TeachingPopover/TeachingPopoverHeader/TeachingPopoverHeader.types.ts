import type {
  TeachingPopoverHeaderProps as TeachingPopoverHeaderBaseProps,
  TeachingPopoverHeaderState as TeachingPopoverHeaderBaseState,
} from '@fluentui/react-headless-components-preview/teaching-popover';
import type { PopoverState } from '../../Popover/Popover/Popover.types';
export type { TeachingPopoverHeaderSlots } from '@fluentui/react-headless-components-preview/teaching-popover';

export type TeachingPopoverHeaderProps = TeachingPopoverHeaderBaseProps;
export type TeachingPopoverHeaderState = TeachingPopoverHeaderBaseState &
  Pick<PopoverState, 'appearance'> & {
    root: TeachingPopoverHeaderBaseState['root'] & { 'data-appearance'?: PopoverState['appearance'] };
  };
