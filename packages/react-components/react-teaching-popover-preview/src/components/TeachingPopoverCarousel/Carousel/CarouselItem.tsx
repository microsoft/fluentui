import { useContextSelector } from '@fluentui/react-context-selector';
import { CarouselContext } from './useCarouselCollection';
import * as React from 'react';
import { CarouselItemProps } from './Carousel.types';
import { useSyncExternalStore } from 'use-sync-external-store/shim';

// TODO: We are going to move this to it's own <CarouselItem/> component, for now we use a simple function to wrap.
// eslint-disable-next-line @typescript-eslint/naming-convention
export function CarouselItem_unstable(props: CarouselItemProps) {
  const { value } = props;

  const store = useContextSelector(CarouselContext, c => c.store);
  let selectedValue = useContextSelector(CarouselContext, c => c.value);

  // Subscribe so we update on store values change
  const values = useSyncExternalStore(store.subscribe, () => store.getSnapshot());

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
