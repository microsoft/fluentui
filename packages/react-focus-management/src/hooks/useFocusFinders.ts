import { useFocusManagementContext } from '../focusManagementContext';

/**
 * Returns a set of helper functions that will traverse focusable elements in the context of a root DOM element
 */
export const useFocusFinders = () => {
  const { focusable } = useFocusManagementContext();

  // Narrow props for now and let need dictate additional props in the future
  const findAll = (root: HTMLElement, matcher: (el: HTMLElement) => boolean) => focusable.findAll(root, matcher);
  const findFirst = (root: HTMLElement) => focusable.findFirst(root);
  const findLast = (root: HTMLElement) => focusable.findLast(root);

  return {
    findAll,
    findFirst,
    findLast,
  };
};
