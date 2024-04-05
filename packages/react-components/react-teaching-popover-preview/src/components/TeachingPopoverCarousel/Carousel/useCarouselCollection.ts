import { Context, ContextSelector, createContext, useContextSelector } from '@fluentui/react-context-selector';
import { CarouselPageChangeData, CarouselStore } from './Carousel.types';
import * as React from 'react';
import { EventHandler } from '@fluentui/react-utilities';

/**
 * A hook for managing a collection of carousel pages
 */
export const createCarouselStore = (): CarouselStore => {
  let values: string[] = [];
  let listeners: Array<() => void> = [];

  const carouselStore = {
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
    getIndex(index: number) {
      return values[index];
    },
  };

  function emitChange() {
    for (let listener of listeners) {
      listener();
    }
  }

  return {
    ...carouselStore,
  };
};

export const useCarouselCollection_unstable = () => {
  const [store] = React.useState(() => createCarouselStore());
  const [value, setValue] = React.useState<string | null>(null);

  // Helper function to enable index based pagination
  const setIndex = (index: number) => {
    let value = store.getIndex(index);
    setValue(value);
  };

  let initialPage = store.getSnapshot().length > 0 ? store.getSnapshot()[0] : null;

  return {
    store: store,
    value: value ?? initialPage,
    setValue,
    setIndex,
    totalPages: store.getSnapshot().length,
    currentIndex: value ? store.getSnapshot().indexOf(value) : 0,
  };
};

export type CarouselContextValue = {
  store: CarouselStore;
  value: string;
  setValue: (value: string) => void;
  setIndex: (index: number) => void;
  currentIndex: number;
  onPageChange?: EventHandler<CarouselPageChangeData>;
  totalPages: number;
};

export const carouselContextDefaultValue: CarouselContextValue = {
  store: createCarouselStore(),
  value: '',
  setValue: (value: string) => {},
  setIndex: (index: number) => {},
  onPageChange: () => null,
  totalPages: 1,
  currentIndex: 0,
};

export const CarouselContext: Context<CarouselContextValue> = createContext<CarouselContextValue | undefined>(
  undefined,
) as Context<CarouselContextValue>;

export const CarouselProvider = CarouselContext.Provider;

export const useCarouselContext_unstable = <T>(selector: ContextSelector<CarouselContextValue, T>): T =>
  useContextSelector(CarouselContext, (ctx = carouselContextDefaultValue) => selector(ctx));
