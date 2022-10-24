import * as React from 'react';
import { TableState } from './types';

let count = 0;

export function useLazyScrolling<TItem>(options: LazyScrollingOptions) {
  // False positive, these plugin hooks are intended to be run on every render
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return (tableState: TableState<TItem>) => useLazyScrollingState(tableState, options);
}

interface LazyScrollingOptions {
  callback: () => void;
  thresholds: number[];
  scrollContainer?: HTMLElement;
}

function useLazyScrollingState<TItem>(tableState: TableState<TItem>, options: LazyScrollingOptions): TableState<TItem> {
  const { items } = tableState;
  const itemCount = items.length;
  const currentObserved = React.useRef<Record<number, HTMLElement>>({});
  const intersectionObserver = React.useState(
    () =>
      new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            options.callback();
          }
        },
        { root: options.scrollContainer, threshold: 0 },
      ),
  )[0];

  const observeRef = React.useCallback(
    (el: HTMLElement) => {
      if (el) {
        intersectionObserver.observe(el);
        currentObserved.current[count++] = el;
      }
    },
    [intersectionObserver],
  );

  const isTargetPosition = (position: number) => {
    return options.thresholds.some(threshold => Math.floor(itemCount * threshold - 1) === position);
  };

  return {
    ...tableState,
    lazyScrolling: {
      observeRef,
      isTargetPosition,
    },
  };
}
