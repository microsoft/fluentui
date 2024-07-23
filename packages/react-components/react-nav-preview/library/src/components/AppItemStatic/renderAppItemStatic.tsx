/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { AppItemStaticState, AppItemStaticSlots } from './AppItemStatic.types';

/**
 * Render the final JSX of AppItemStatic
 */
export const renderAppItemStatic_unstable = (state: AppItemStaticState) => {
  assertSlots<AppItemStaticSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root />;
};
