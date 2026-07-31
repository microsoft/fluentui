import type {
  TeachingPopoverCarouselNavButtonBaseProps,
  TeachingPopoverCarouselNavButtonBaseState,
} from '@fluentui/react-teaching-popover';

export type { TeachingPopoverCarouselNavButtonSlots } from '@fluentui/react-teaching-popover';

export type TeachingPopoverCarouselNavButtonProps = TeachingPopoverCarouselNavButtonBaseProps;

export type TeachingPopoverCarouselNavButtonState = TeachingPopoverCarouselNavButtonBaseState & {
  root: {
    'data-selected'?: string;
  };
};
