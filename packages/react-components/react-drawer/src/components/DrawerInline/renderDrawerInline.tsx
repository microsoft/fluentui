/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { assertSlots } from '@fluentui/react-utilities';
import type { DrawerInlineState, DrawerInlineSlots } from './DrawerInline.types';

/**
 * Render the final JSX of DrawerInline
 */
export const renderDrawerInline_unstable = (state: DrawerInlineState) => {
  if (!state.motion.canRender) {
    return null;
  }

  assertSlots<DrawerInlineSlots>(state);

  return <state.root />;
};
