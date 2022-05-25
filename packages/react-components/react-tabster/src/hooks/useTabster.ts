import { useFluent } from '@fluentui/react-shared-contexts';
import { getCurrentTabster, createTabster, Types as TabsterTypes } from 'tabster';

/**
 * Tries to get a tabster instance on the current window or creates a new one
 * Since Tabster is single instance only, feel free to call this hook to ensure Tabster exists if necessary
 *
 * @internal
 * @returns Tabster core instance
 */
export const useTabster = (): TabsterTypes.TabsterCore | null => {
  const { targetDocument } = useFluent();

  const defaultView = targetDocument?.defaultView || undefined;
  const tabsterOptions: TabsterTypes.TabsterCoreProps = { autoRoot: {}, controlTab: false };

  if (!defaultView) {
    return null;
  }

  // TODO: worth memoizing once more tabster options are used
  return getCurrentTabster(defaultView) ?? createTabster(defaultView, tabsterOptions);
};
