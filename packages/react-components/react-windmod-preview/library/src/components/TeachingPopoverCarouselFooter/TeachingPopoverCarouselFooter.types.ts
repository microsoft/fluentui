import type { ExtractSlotProps, Slot, SlotComponentType } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselFooterProps as TeachingPopoverCarouselFooterHeadlessProps,
  TeachingPopoverCarouselFooterState as TeachingPopoverCarouselFooterHeadlessState,
} from '@fluentui/react-headless-components-preview/teaching-popover';

import type { TeachingPopoverCarouselFooterButton } from '../TeachingPopoverCarouselFooterButton/TeachingPopoverCarouselFooterButton';

/** Whether the two buttons balance across the row or sit together at its end. */
export type TeachingPopoverCarouselFooterLayout = 'offset' | 'centered';

/**
 * The headless footer resolves both buttons onto its own carousel footer button; windmod resolves
 * them onto windmod's, which is what carries the Fluent look.
 */
export type TeachingPopoverCarouselFooterSlots = {
  /** The element wrapping carousel pages and navigation. */
  root: NonNullable<Slot<'div'>>;
  /** Previous-page button. Rendered by default, as the reference does. */
  previous?: Slot<typeof TeachingPopoverCarouselFooterButton>;
  /** Next/finish-page button. */
  next: NonNullable<Slot<typeof TeachingPopoverCarouselFooterButton>>;
};

/** A resolved footer button slot: props plus the metadata that makes it renderable as JSX. */
export type TeachingPopoverCarouselFooterButtonSlot = SlotComponentType<
  ExtractSlotProps<TeachingPopoverCarouselFooterSlots['next']>
>;

/**
 * Windmod TeachingPopoverCarouselFooter props: the headless footer plus the layout look prop the
 * headless surface omits.
 */
export type TeachingPopoverCarouselFooterProps = Omit<TeachingPopoverCarouselFooterHeadlessProps, 'previous' | 'next'> &
  Omit<TeachingPopoverCarouselFooterSlots, 'root'> & {
    /** @default 'centered' */
    layout?: TeachingPopoverCarouselFooterLayout;
  };

/** Windmod TeachingPopoverCarouselFooter state: headless state, the resolved slots and the layout. */
export type TeachingPopoverCarouselFooterState = Omit<TeachingPopoverCarouselFooterHeadlessState, 'previous' | 'next'> &
  Required<Pick<TeachingPopoverCarouselFooterProps, 'layout'>> & {
    previous?: TeachingPopoverCarouselFooterButtonSlot;
    next: TeachingPopoverCarouselFooterButtonSlot;
  };
