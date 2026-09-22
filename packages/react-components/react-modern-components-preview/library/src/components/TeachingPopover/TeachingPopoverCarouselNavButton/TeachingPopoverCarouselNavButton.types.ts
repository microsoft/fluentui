import type {
  TeachingPopoverCarouselNavButtonProps as TeachingPopoverCarouselNavButtonBaseProps,
  TeachingPopoverCarouselNavButtonState as TeachingPopoverCarouselNavButtonBaseState,
} from '@fluentui/react-headless-components-preview/teaching-popover';
import type { PopoverState } from '../../Popover/Popover/Popover.types';
export type { TeachingPopoverCarouselNavButtonSlots } from '@fluentui/react-headless-components-preview/teaching-popover';

export type TeachingPopoverCarouselNavButtonProps = TeachingPopoverCarouselNavButtonBaseProps;
export type TeachingPopoverCarouselNavButtonState = TeachingPopoverCarouselNavButtonBaseState &
  Pick<PopoverState, 'appearance'> & {
    root: TeachingPopoverCarouselNavButtonBaseState['root'] & {
      'data-appearance'?: PopoverState['appearance'];
    };
  };
