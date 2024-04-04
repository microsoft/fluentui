import { createContext } from '@fluentui/react-context-selector';
import { CarouselStore } from './Carousel.types';
import { useCarouselWalker } from './useCarouselWalker';
import * as React from 'react';

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
        console.log(prev, values, pos);
        values.splice(pos + 1, 0, value);
      }

      console.log(values);
    },
    removeValue(value: string) {
      const pos = values.indexOf(value);
      values.splice(pos, 1);
      console.log(values);
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

export type CarouselContextType = {
  store: CarouselStore;
  value: string;
  setValue: (value: string) => void;
  setIndex: (index: number) => void;
  pageRef: React.MutableRefObject<string | undefined | null>;
};

export const CarouselContext = createContext<CarouselContextType>({
  store: createCarouselStore(),
  value: '',
  setValue: (value: string) => {},
  setIndex: (index: number) => {},
  pageRef: React.createRef(),
});
