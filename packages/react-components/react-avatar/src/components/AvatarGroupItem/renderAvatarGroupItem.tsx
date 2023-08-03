/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { AvatarGroupItemState, AvatarGroupItemSlots } from './AvatarGroupItem.types';

/**
 * Render the final JSX of AvatarGroupItem
 */
export const renderAvatarGroupItem_unstable = (state: AvatarGroupItemState) => {
  const { slots, slotProps } = getSlotsNext<AvatarGroupItemSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <slots.avatar {...slotProps.avatar} />
      {state.isOverflowItem && <slots.overflowLabel {...slotProps.overflowLabel} />}
    </slots.root>
  );
};
