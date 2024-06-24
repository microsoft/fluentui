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
} & Pick<CarouselCardProps, 'value'>;
