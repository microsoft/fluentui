import { useFocusManagementContext } from '../focusManagementContext';

/**
 * Returns a set of helper functions that will traverse focusable elements in the context of a root DOM element
 */
export const useKeyboardNavigationState = () => {
  const { keyboardNavigationState } = useFocusManagementContext();

  return {
    isNavigatingWithKeyboard: keyboardNavigationState?.isNavigatingWithKeyboard.bind(keyboardNavigationState),
  };
};
