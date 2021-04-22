import { useTabster } from './useTabster';

/**
 * Returns a set of helper functions that will traverse focusable elements in the context of a root DOM element
 */
export const useFocusFinders = () => {
  const tabster = useTabster();

  // Narrow props for now and let need dictate additional props in the future
  const findAllFocusable = (root: HTMLElement, matcher: (el: HTMLElement) => boolean) =>
    tabster?.focusable.findAll(root, matcher) || [];
  const findFirstFocusable = (root: HTMLElement) => tabster?.focusable.findFirst(root);
  const findLastFocusable = (root: HTMLElement) => tabster?.focusable.findLast(root);

  return {
    findAllFocusable,
    findFirstFocusable,
    findLastFocusable,
  };
};
