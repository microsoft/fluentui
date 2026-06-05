import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselFooterButtonProps } from '../TeachingPopoverCarouselFooterButton/TeachingPopoverCarouselFooterButton.types';

export type TeachingPopoverCarouselFooterSlots = {
  /**
   * The element wrapping carousel pages and navigation.
   */
  root: NonNullable<Slot<'div'>>;

  /**
   * Previous-page button. Defaults to `TeachingPopoverCarouselFooterButton`
   * with `navType: 'prev'`; consumers provide `altText` and content.
   */
  previous?: Slot<TeachingPopoverCarouselFooterButtonProps>;

  /**
   * Next/finish-page button. Defaults to `TeachingPopoverCarouselFooterButton`
   * with `navType: 'next'`; consumers provide `altText` and content.
   */
  next: NonNullable<Slot<TeachingPopoverCarouselFooterButtonProps>>;
};

export type TeachingPopoverCarouselFooterProps = ComponentProps<TeachingPopoverCarouselFooterSlots>;

export type TeachingPopoverCarouselFooterState = ComponentState<TeachingPopoverCarouselFooterSlots>;
