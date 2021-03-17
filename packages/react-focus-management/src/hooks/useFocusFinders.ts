import { useFocusManagementContext } from '../focusManagementContext';

/**
 * Returns a set of helper functions that will traverse focusable elements in the context of a root DOM element
 */
export const useFocusFinders = () => {
  const { ahInstance } = useFocusManagementContext();

  // Narrow props for now and let need dictate additional props in the future
  const findAllFocusable = (root: HTMLElement, matcher: (el: HTMLElement) => boolean) =>
    ahInstance?.focusable.findAll(root, matcher) || [];
  const findFirstFocusable = (root: HTMLElement) => ahInstance?.focusable.findFirst(root);
  const findLastFocusable = (root: HTMLElement) => ahInstance?.focusable.findLast(root);

  return {
    findAllFocusable,
    findFirstFocusable,
    findLastFocusable,
  };
};
