import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CarouselNavButtonSlots = {
  /** The full-size `role="tab"` target. Paint the focus ring here, not on the indicator. */
  root: Slot<'button'>;
  /** The visual mark. Elongate it when selected so position doesn't depend on color alone. */
  indicator: NonNullable<Slot<'span'>>;
};

export type CarouselNavButtonProps = ComponentProps<Partial<CarouselNavButtonSlots>>;

export type CarouselNavButtonState = ComponentState<CarouselNavButtonSlots> & {
  root: {
    'data-selected'?: string;
  };
};
