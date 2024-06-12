import { useSyncExternalStore } from 'use-sync-external-store/shim';

import { useCarouselContext_unstable } from './CarouselContext';
import type { CarouselStore } from './CarouselContext.types';

export function useCarouselStore_unstable<T>(
  getSnapshot: (snapshot: ReturnType<CarouselStore['getSnapshot']>) => T,
): T {
  const { store } = useCarouselContext_unstable();

  return useSyncExternalStore(store.subscribe, () => getSnapshot(store.getSnapshot()));
}
