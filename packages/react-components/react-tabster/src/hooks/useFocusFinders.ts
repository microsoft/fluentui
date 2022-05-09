import * as React from 'react';
import { Types as TabsterTypes } from 'tabster';
import { useTabster } from './useTabster';

/**
 * Returns a set of helper functions that will traverse focusable elements in the context of a root DOM element
 */
export const useFocusFinders = () => {
  const tabster = useTabster();

  // Narrow props for now and let need dictate additional props in the future
  const findAllFocusable = React.useCallback(
    (container: HTMLElement, acceptCondition: (el: HTMLElement) => boolean) =>
      tabster?.focusable.findAll({ container, acceptCondition }) || [],
    [tabster],
  );

  const findFirstFocusable = React.useCallback(
    (container: HTMLElement) => tabster?.focusable.findFirst({ container }),
    [tabster],
  );

  const findLastFocusable = React.useCallback((container: HTMLElement) => tabster?.focusable.findLast({ container }), [
    tabster,
  ]);

  const findNextFocusable = React.useCallback(
    (currentElement: HTMLElement, options: Pick<TabsterTypes.FindNextProps, 'container'> = {}) =>
      tabster?.focusable.findNext({ currentElement, ...options }),
    [tabster],
  );

  const findPrevFocusable = React.useCallback(
    (currentElement: HTMLElement, options: Pick<TabsterTypes.FindNextProps, 'container'> = {}) =>
      tabster?.focusable.findPrev({ currentElement, ...options }),
    [tabster],
  );

  return {
    findAllFocusable,
    findFirstFocusable,
    findLastFocusable,
    findNextFocusable,
    findPrevFocusable,
  };
};
