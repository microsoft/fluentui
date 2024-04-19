/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';

import type { InlineDrawerState, InlineDrawerSlots } from './InlineDrawer.types';

/**
 * Render the final JSX of InlineDrawer
 */
export const renderInlineDrawer_unstable = (state: InlineDrawerState) => {
  if (!state.motion.canRender) {
    return null;
  }

  assertSlots<InlineDrawerSlots>(state);

  return <state.root />;
};
