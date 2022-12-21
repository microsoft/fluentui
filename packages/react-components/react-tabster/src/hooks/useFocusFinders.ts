import * as React from 'react';
import { Types as TabsterTypes } from 'tabster';
import { useTabster } from './useTabster';

/**
 * Returns a set of helper functions that will traverse focusable elements in the context of a root DOM element
 */
export const useFocusFinders = () => {
  const getTabster = useTabster();

  // Narrow props for now and let need dictate additional props in the future
  const findAllFocusable = React.useCallback(
    (container: HTMLElement, acceptCondition?: (el: HTMLElement) => boolean) =>
      getTabster()?.focusable.findAll({ container, acceptCondition }) || [],
    [getTabster],
  );

  const findFirstFocusable = React.useCallback(
    (container: HTMLElement) => getTabster()?.focusable.findFirst({ container }),
    [getTabster],
  );

  const findLastFocusable = React.useCallback(
    (container: HTMLElement) => getTabster()?.focusable.findLast({ container }),
    [getTabster],
  );

  const findNextFocusable = React.useCallback(
    (currentElement: HTMLElement, options: Pick<TabsterTypes.FindNextProps, 'container'> = {}) =>
      getTabster()?.focusable.findNext({ currentElement, ...options }),
    [getTabster],
  );

  const findPrevFocusable = React.useCallback(
    (currentElement: HTMLElement, options: Pick<TabsterTypes.FindNextProps, 'container'> = {}) =>
      getTabster()?.focusable.findPrev({ currentElement, ...options }),
    [getTabster],
  );

  return {
    findAllFocusable,
    findFirstFocusable,
    findLastFocusable,
    findNextFocusable,
    findPrevFocusable,
  };
};
