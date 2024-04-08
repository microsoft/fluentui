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
  const [value, _setValue] = React.useState<string | null>(null);
  const [index, _setIndex] = React.useState<number>(0);

  // Helper function to enable index based pagination
  const setIndex = (_index: number) => {
    let _value = store.getIndex(_index);
    _setIndex(_index);
    if (_value) {
      _setValue(_value);
    }
  };

  const setValue = (_value: string) => {
    let _index = store.getSnapshot().indexOf(_value);
    _setValue(_value);
    if (index >= 0) {
      _setIndex(_index);
    }
  };

  // Backup for value on initial state - will set to current index or first rendered page.
  const initialPage = store.getSnapshot().length > index ? store.getSnapshot()[index] : store.getSnapshot()[0];

  return {
    store: store,
    value: value ?? initialPage,
    setValue,
    setIndex,
    totalPages: store.getSnapshot().length,
    currentIndex: Math.min(index, store.getSnapshot().length - 1),
  };
};

export type CarouselContextValue = {
  store: CarouselStore;
  value: string | null;
  setValue: (value: string) => void;
  setIndex: (index: number) => void;
  currentIndex: number;
  onPageChange?: EventHandler<CarouselPageChangeData>;
  totalPages: number;
};

export const carouselContextDefaultValue: CarouselContextValue = {
  store: createCarouselStore(),
  value: '',
  setValue: (_value: string) => null,
  setIndex: (_index: number) => null,
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
