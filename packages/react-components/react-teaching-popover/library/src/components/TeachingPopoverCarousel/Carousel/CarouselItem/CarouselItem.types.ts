import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CarouselItemSlots = {
  /**
   * The element wrapping carousel pages and navigation.
   */
  root: NonNullable<Slot<'div'>>;
};

export type CarouselItemProps = ComponentProps<CarouselItemSlots> & {
  /**
   * The value used to identify a page,
   * it should be unique and is necessary for pagination
   */
  value: string;
};

/**
 * TeachingPopoverCarousel State and Context Hooks
 */
export type CarouselItemState = ComponentState<Required<CarouselItemSlots>> & {
  visible: boolean;
} & Pick<CarouselItemProps, 'value'>;
