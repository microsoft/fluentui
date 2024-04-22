import { useSyncExternalStore } from 'use-sync-external-store/shim';

import { useCarouselContext_unstable } from './CarouselContext';
import type { CarouselStore } from './Carousel.types';

export function useCarouselValues_unstable<T>(getSnapshot: (values: ReturnType<CarouselStore['getSnapshot']>) => T): T {
  const store = useCarouselContext_unstable(c => c.store);

  return useSyncExternalStore(store.subscribe, () => getSnapshot(store.getSnapshot()));
}
