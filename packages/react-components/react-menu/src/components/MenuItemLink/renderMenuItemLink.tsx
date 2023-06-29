/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { MenuItemLinkState, MenuItemLinkSlots } from './MenuItemLink.types';

/**
 * Render the final JSX of MenuItemLink
 */
export const renderMenuItemLink_unstable = (state: MenuItemLinkState) => {
  const { slots, slotProps } = getSlotsNext<MenuItemLinkSlots>(state);

  // TODO Add additional slots in the appropriate place
  return (
    <slots.root {...slotProps.root}>
      {slots.checkmark && <slots.checkmark {...slotProps.checkmark} />}
      {slots.icon && <slots.icon {...slotProps.icon} />}
      {slots.content && <slots.content {...slotProps.content} />}
      {slots.secondaryContent && <slots.secondaryContent {...slotProps.secondaryContent} />}
    </slots.root>
  );
};
