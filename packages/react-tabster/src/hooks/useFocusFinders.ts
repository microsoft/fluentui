import { useTabsterContext } from '../TabsterContext';

/**
 * Returns a set of helper functions that will traverse focusable elements in the context of a root DOM element
 */
export const useFocusFinders = () => {
  const ctx = useTabsterContext();

  // Narrow props for now and let need dictate additional props in the future
  const findAllFocusable = (root: HTMLElement, matcher: (el: HTMLElement) => boolean) =>
    ctx?.focusable.findAll(root, matcher) || [];
  const findFirstFocusable = (root: HTMLElement) => ctx?.focusable.findFirst(root);
  const findLastFocusable = (root: HTMLElement) => ctx?.focusable.findLast(root);

  return {
    findAllFocusable,
    findFirstFocusable,
    findLastFocusable,
  };
};
