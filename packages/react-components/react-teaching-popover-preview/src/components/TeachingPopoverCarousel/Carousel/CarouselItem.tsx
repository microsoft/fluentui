import { useContextSelector } from '@fluentui/react-context-selector';
import { CarouselContext } from './useCarouselCollection';
import * as React from 'react';

export function CarouselItem_unstable(props: { children?: React.ReactNode; value: string }) {
  const { value } = props;
  const visible = useContextSelector(CarouselContext, c => c.value === value);
  const currentValue = useContextSelector(CarouselContext, c => c.value);
  const setValue = useContextSelector(CarouselContext, c => c.setValue);
  const pageRef = useContextSelector(CarouselContext, c => c.pageRef);

  if (pageRef.current === undefined) {
    // If value is empty, we set to the first page rendered.
    setValue(value);
  }

  console.log('Checking value for: ', currentValue);
  return (
    <>
      <span data-carousel-item={value} data-carousel-active-item={!!visible} hidden />
      <div hidden={!visible}>{props.children}</div>
    </>
  );
}
