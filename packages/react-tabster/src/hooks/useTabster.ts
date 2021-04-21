import { useFluent } from '@fluentui/react-shared-contexts';
import { getCurrentTabster, createTabster } from 'tabster';

/**
 * Tries to get a tabster instance on the current window or creates a new one
 * @internal
 * @returns Tabster core instance
 */
export const useTabster = () => {
  const { targetDocument } = useFluent();

  const defaultView = targetDocument?.defaultView || undefined;
  const tabsterOptions = { autoRoot: {} };

  if (!defaultView) {
    return null;
  }

  return getCurrentTabster(defaultView) ?? createTabster(defaultView, tabsterOptions);
};
