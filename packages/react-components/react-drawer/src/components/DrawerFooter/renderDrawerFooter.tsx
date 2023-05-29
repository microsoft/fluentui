/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { assertSlots } from '@fluentui/react-utilities';
import type { DrawerFooterState, DrawerFooterSlots } from './DrawerFooter.types';

/**
 * Render the final JSX of DrawerFooter
 */
export const renderDrawerFooter_unstable = (state: DrawerFooterState) => {
  assertSlots<DrawerFooterSlots>(state);

  return <state.root />;
};
