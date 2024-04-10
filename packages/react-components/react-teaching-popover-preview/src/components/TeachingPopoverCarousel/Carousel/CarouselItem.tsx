import * as React from 'react';

import { useCarouselContext_unstable } from './CarouselContext';
import type { CarouselItemProps } from './Carousel.types';

// TODO: We are going to move this to it's own <CarouselItem/> component, for now we use a simple function to wrap.
// eslint-disable-next-line @typescript-eslint/naming-convention
export function CarouselItem_unstable(props: CarouselItemProps) {
  const { value } = props;
  const visible = useCarouselContext_unstable(c => c.value === value);

  return (
    <>
      <span data-carousel-item={value} data-carousel-active-item={visible} hidden />
      {visible && <div>{props.children}</div>}
    </>
  );
}
