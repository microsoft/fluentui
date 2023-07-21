/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import { MenuGroupHeaderSlots, MenuGroupHeaderState } from './MenuGroupHeader.types';

/**
 * Redefine the render function to add slots. Reuse the menugroupheader structure but add
 * slots to children.
 */
export const renderMenuGroupHeader_unstable = (state: MenuGroupHeaderState) => {
  const { slots, slotProps } = getSlotsNext<MenuGroupHeaderSlots>(state);

  return <slots.root {...slotProps.root} />;
};
