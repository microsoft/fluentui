import type {
  TeachingPopoverCarouselFooterButtonProps as TeachingPopoverCarouselFooterButtonBaseProps,
  TeachingPopoverCarouselFooterButtonState as TeachingPopoverCarouselFooterButtonBaseState,
} from '@fluentui/react-headless-components-preview/teaching-popover';
import type { ButtonState } from '../../Button/Button.types';
import type { PopoverState } from '../../Popover/Popover/Popover.types';
export type { TeachingPopoverCarouselFooterButtonSlots } from '@fluentui/react-headless-components-preview/teaching-popover';

export type TeachingPopoverCarouselFooterButtonProps = TeachingPopoverCarouselFooterButtonBaseProps;
export type TeachingPopoverCarouselFooterButtonState = TeachingPopoverCarouselFooterButtonBaseState &
  ButtonState & {
    popoverAppearance: PopoverState['appearance'];
    root: TeachingPopoverCarouselFooterButtonBaseState['root'] & {
      'data-nav-type': TeachingPopoverCarouselFooterButtonBaseState['navType'];
      'data-popover-appearance'?: PopoverState['appearance'];
    };
  };
