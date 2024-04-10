import { type CarouselStore } from './Carousel.types';

export const createCarouselStore = (): CarouselStore => {
  let values: string[] = [];
  let listeners: Array<() => void> = [];

  const carouselStore = {
    clear() {
      values = [];
      emitChange();
    },
    addValue(value: string) {
      values = [...values, value];

      emitChange();
    },
    insertValue(value: string, prev: string | null) {
      if (!prev) {
        values = [value, ...values];
      } else {
        const pos = values.indexOf(prev);
        values.splice(pos + 1, 0, value);
        // Required to be defined as a 'new' array for useSyncExternalStore
        values = [...values];
      }
      emitChange();
    },
    removeValue(value: string) {
      const pos = values.indexOf(value);
      values.splice(pos, 1);
      // Required to be defined as a 'new' array for useSyncExternalStore
      values = [...values];
      emitChange();
    },
    subscribe(listener: () => void) {
      listeners = [...listeners, listener];

      return () => {
        listeners = listeners.filter(l => l !== listener);
      };
    },
    getSnapshot() {
      return values;
    },
  };

  function emitChange() {
    for (const listener of listeners) {
      listener();
    }
  }

  return carouselStore;
};
