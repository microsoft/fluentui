import * as React from 'react';
import { useTabster } from './useTabster';

/**
 * Returns a set of helper functions that will traverse focusable elements in the context of a root DOM element
 */
export const useFocusFinders = () => {
  const tabster = useTabster();

  // Narrow props for now and let need dictate additional props in the future
  const findAllFocusable = React.useCallback(
    (root: HTMLElement, matcher: (el: HTMLElement) => boolean) => tabster?.focusable.findAll(root, matcher) || [],
    [tabster],
  );
  const findFirstFocusable = React.useCallback((root: HTMLElement) => tabster?.focusable.findFirst(root), [tabster]);
  const findLastFocusable = React.useCallback((root: HTMLElement) => tabster?.focusable.findLast(root), [tabster]);
  const findNextFocusable = React.useCallback((current: HTMLElement) => tabster?.focusable.findNext(current), [
    tabster,
  ]);
  const findPrevFocusable = React.useCallback((current: HTMLElement) => tabster?.focusable.findPrev(current), [
    tabster,
  ]);

  return {
    findAllFocusable,
    findFirstFocusable,
    findLastFocusable,
    findNextFocusable,
    findPrevFocusable,
  };
};
