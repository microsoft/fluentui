import type { SlotClassNames } from '@fluentui/react-utilities';
import { getComponentSlotClassName } from '@fluentui/react-utilities';
import type { MenuPopoverSlots, MenuPopoverState } from './MenuPopover.types';

export const menuPopoverClassNames: SlotClassNames<MenuPopoverSlots> = {
  root: 'fui-MenuPopover',
};

export const useMenuPopoverStyles_unstable = (state: MenuPopoverState): MenuPopoverState => {
  const { mountNode, safeZone, ...componentState } = state;
  state.root.className = getComponentSlotClassName(menuPopoverClassNames.root, state.root, componentState);
  return state;
};
