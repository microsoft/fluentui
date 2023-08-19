/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { assertSlots } from '@fluentui/react-utilities';
import type { DrawerInlineState, DrawerInlineSlots } from './DrawerInline.types';

/**
 * Render the final JSX of DrawerInline
 */
export const renderDrawerInline_unstable = (state: DrawerInlineState) => {
  assertSlots<DrawerInlineSlots>(state);

  if (!state.open) {
    return null;
  }
  return <state.root />;
};
