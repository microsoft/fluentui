/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { MenuSplitGroupState, MenuSplitGroupSlots } from './MenuSplitGroup.types';

/**
 * Render the final JSX of MenuSplitGroup
 */
export const renderMenuSplitGroup_unstable = (state: MenuSplitGroupState) => {
  const { slots, slotProps } = getSlotsNext<MenuSplitGroupSlots>(state);

  return <slots.root {...slotProps.root} />;
};
