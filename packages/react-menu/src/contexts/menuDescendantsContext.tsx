import { createDescendantContext, Descendant, useDescendant, useDescendants } from '@fluentui/react-utilities';

/**
 * The API that menu trigger descendants register
 */
export interface MenuTriggerDescendant extends Descendant {
  dismissMenu: () => void;
  open: boolean;
}

/**
 * Context that tracks all the descendant children of a menu
 * Currently this context only tracks menu triggers that are children
 */
export const MenuDescendantsContext = createDescendantContext<MenuTriggerDescendant>('menu', {
  dismissMenu: () => null,
  open: false,
});

/**
 * Registers a menu descendant child
 * @param menuTriggerDescendant
 */
export const useMenuDescendant = (menuTriggerDescendant: Omit<MenuTriggerDescendant, 'index'>) => {
  return useDescendant<MenuTriggerDescendant>(menuTriggerDescendant, MenuDescendantsContext);
};

/**
 * Returns all menu trigger descendant children that are open
 */
export const useMenuTriggerOpenDescendants = () => {
  const menuTriggerDescendants = useDescendants(MenuDescendantsContext);
  return menuTriggerDescendants.filter(menuTrigger => menuTrigger.open);
};
