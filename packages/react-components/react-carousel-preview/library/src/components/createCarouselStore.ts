import { type CarouselStore } from './CarouselContext.types';

export const createCarouselStore = (initialValue: number): CarouselStore => {
  let activeIndex: number = initialValue;

  let listeners: Array<() => void> = [];

  const carouselStore = {
    setActiveIndex(newValue: number) {
      activeIndex = newValue;
      emitChange();
    },
    subscribe(listener: () => void) {
      listeners = [...listeners, listener];

      return () => {
        listeners = listeners.filter(l => l !== listener);
      };
    },

    getSnapshot() {
      return { activeIndex };
    },
  };

  function emitChange() {
    for (const listener of listeners) {
      listener();
    }
  }

  return carouselStore;
};
