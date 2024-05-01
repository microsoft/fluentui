import { useSyncExternalStore } from 'use-sync-external-store/shim';

import { useCarouselContext_unstable } from './CarouselContext';

export function useCarouselValues_unstable<T>(getSnapshot: (values: string[]) => T): T {
  const store = useCarouselContext_unstable(c => c.store);

  return useSyncExternalStore(store.subscribe, () => getSnapshot(store.getSnapshot()));
}
