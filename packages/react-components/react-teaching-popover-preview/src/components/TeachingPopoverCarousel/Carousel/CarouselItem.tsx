import * as React from 'react';

import { useCarouselContext_unstable } from './CarouselContext';
import type { CarouselItemProps } from './Carousel.types';
import { useCarouselValues_unstable } from './useCarouselValues';

// TODO: We are going to move this to it's own <CarouselItem/> component, for now we use a simple function to wrap.
// eslint-disable-next-line @typescript-eslint/naming-convention
export function CarouselItem_unstable(props: CarouselItemProps) {
  const { value } = props;

  let selectedValue = useCarouselContext_unstable(c => c.value);
  // Subscribe so we update on store values change
  const values = useCarouselValues_unstable(values => values);

  if (!selectedValue) {
    // Default to first page if undefined
    selectedValue = values[0];
  }

  const visible = selectedValue === value;

  return (
    <>
      <span data-carousel-item={value} data-carousel-active-item={!!visible} hidden />
      {!!visible && <div>{props.children}</div>}
    </>
  );
}
