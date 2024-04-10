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
    getIndex(index: number) {
      if (index < values.length) {
        return values[index];
      }
      // Safety fallback if not found, undefined is ok too.
      return values[0];
    },
  };

  function emitChange() {
    for (const listener of listeners) {
      listener();
    }
  }

  return {
    ...carouselStore,
  };
};

export const useCarouselCollection_unstable = () => {
  const [store] = React.useState(() => createCarouselStore());

  return {
    store,
  };
};

export type CarouselContextValue = {
  store: CarouselStore;
  value: string;
  setValue: (value: string) => void;
  onPageChange?: EventHandler<CarouselPageChangeData>;
};

export const carouselContextDefaultValue: CarouselContextValue = {
  store: createCarouselStore(),
  value: '',
  setValue: () => {},
  onPageChange: () => null,
};

export const CarouselContext: Context<CarouselContextValue> = createContext<CarouselContextValue | undefined>(
  undefined,
) as Context<CarouselContextValue>;

export const CarouselProvider = CarouselContext.Provider;

export const useCarouselContext_unstable = <T>(selector: ContextSelector<CarouselContextValue, T>): T =>
  useContextSelector(CarouselContext, (ctx = carouselContextDefaultValue) => selector(ctx));
