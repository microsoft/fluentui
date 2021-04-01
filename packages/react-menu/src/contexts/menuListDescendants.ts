import { createDescendantContext, Descendant, useDescendants } from '@fluentui/react-utilities';

export interface MenuListDescendant<ElementType = HTMLElement> extends Descendant<ElementType> {
  hasIconSlot?: boolean;
  hasCheckmarkSlot?: boolean;
}

export const MenuListDescendantContext = createDescendantContext<MenuListDescendant>('MenuListDescendantContext');

export const useMenuListHasIconSlots = () => {
  const descendants = useDescendants(MenuListDescendantContext);
  let hasIconSlot = false;
  let hasCheckmarkSlot = false;

  // We only need one item in the menu list to have an icon slot to force all items to readjust
  let i = 0;
  while (i < descendants.length && (!hasIconSlot || !hasCheckmarkSlot)) {
    hasIconSlot = !!descendants[i].hasIconSlot || hasIconSlot;
    hasCheckmarkSlot = !!descendants[i].hasCheckmarkSlot || hasCheckmarkSlot;
    i++;
  }

  return { hasCheckmarkSlot, hasIconSlot };
};
