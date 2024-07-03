import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CarouselCardSlots = {
  root: Slot<'div'>;
};

/**
 * CarouselCard Props
 */
export type CarouselCardProps = ComponentProps<CarouselCardSlots> & {
  /**
   * The value used to identify a page,
   * it should be unique and is necessary for pagination
   */
  value: string;
};

/**
 * State used in rendering CarouselCard
 */
export type CarouselCardState = ComponentState<CarouselCardSlots> & {
  visible: boolean;
  /**
   * Tracks the translate offset index for circular motion
   */
  offsetIndex: number;
  /**
   * The uniform card width of all cards, passed in from carousel context
   */
  cardWidth: string | number;
  /**
   * Tracks the initial load for positioning without animation
   */
  initialLoad: boolean;
} & Pick<CarouselCardProps, 'value'>;
