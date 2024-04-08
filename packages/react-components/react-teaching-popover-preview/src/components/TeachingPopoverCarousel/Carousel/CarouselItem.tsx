import { useContextSelector } from '@fluentui/react-context-selector';
import { CarouselContext } from './useCarouselCollection';
import * as React from 'react';
import { CarouselItemProps } from './Carousel.types';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function CarouselItem_unstable(props: CarouselItemProps) {
  const { value } = props;

  const carouselContext = useContextSelector(CarouselContext, c => c);

  if (!carouselContext) {
    return props.children;
  }

  const visible = carouselContext.value === value;

  return (
    <>
      <span data-carousel-item={value} data-carousel-active-item={!!visible} hidden />
      {!!visible && <div>{props.children}</div>}
    </>
  );
}
