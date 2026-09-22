import type {
  TeachingPopoverCarouselProps as TeachingPopoverCarouselBaseProps,
  TeachingPopoverCarouselState as TeachingPopoverCarouselBaseState,
} from '@fluentui/react-headless-components-preview/teaching-popover';
import type { PopoverState } from '../../Popover/Popover/Popover.types';
export type {
  TeachingPopoverCarouselContextValues,
  TeachingPopoverCarouselSlots,
} from '@fluentui/react-headless-components-preview/teaching-popover';

export type TeachingPopoverCarouselProps = TeachingPopoverCarouselBaseProps;
export type TeachingPopoverCarouselState = TeachingPopoverCarouselBaseState &
  Pick<PopoverState, 'appearance'> & {
    root: TeachingPopoverCarouselBaseState['root'] & { 'data-appearance'?: PopoverState['appearance'] };
  };
