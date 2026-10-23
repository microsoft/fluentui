import type { TeachingPopoverCarouselFooterButtonBaseProps } from '@fluentui/react-teaching-popover';

export type {
  TeachingPopoverCarouselFooterButtonBaseState as TeachingPopoverCarouselFooterButtonState,
  TeachingPopoverCarouselFooterButtonSlots,
} from '@fluentui/react-teaching-popover';

export type TeachingPopoverCarouselFooterButtonProps = TeachingPopoverCarouselFooterButtonBaseProps & {
  /**
   * Hide this button at its navigation boundary, even when `altText` is provided.
   * Defaults to false; empty content, icons and accessible labels do not imply unavailability.
   *
   * Within a TeachingPopoverCarouselFooter, focus moves to the other footer button
   * only when this button becomes hidden while focused and the other button is focusable.
   * Custom roots must forward the ref, focus handlers and `hidden` attribute.
   */
  hideOnBoundary?: boolean;
};
