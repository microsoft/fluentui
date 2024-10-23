/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';

import type { DrawerBodySlots, DrawerBodyState } from './DrawerBody.types';

/**
 * Render the final JSX of DrawerBody
 */
export const renderDrawerBody_unstable = (state: DrawerBodyState) => {
  assertSlots<DrawerBodySlots>(state);

  return <state.root />;
};
