import { useFocusManagementContext } from '../focusManagementContext';

/**
 * Returns a set of helper functions that will traverse focusable elements in the context of a root DOM element
 */
export const useFocusFinders = () => {
  const { ahInstance } = useFocusManagementContext();

  // Narrow props for now until there is a need for modalizer/groupper
  const findAll = (root: HTMLElement, matcher: (el: HTMLElement) => boolean) =>
    ahInstance.focusable.findAll(root, matcher);
  const findFirst = (root: HTMLElement) => ahInstance.focusable.findFirst(root);
  const findLast = (root: HTMLElement) => ahInstance.focusable.findLast(root);

  return {
    findAll,
    findFirst,
    findLast,
  };
};
