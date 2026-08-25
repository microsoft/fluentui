import type { TeachingPopoverCarouselNavButtonBaseState } from '@fluentui/react-teaching-popover';

export type {
  TeachingPopoverCarouselNavButtonSlots,
  TeachingPopoverCarouselNavButtonBaseProps as TeachingPopoverCarouselNavButtonProps,
} from '@fluentui/react-teaching-popover';

export type TeachingPopoverCarouselNavButtonState = TeachingPopoverCarouselNavButtonBaseState & {
  root: {
    'data-selected'?: string;
  };
};
