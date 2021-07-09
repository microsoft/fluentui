import { useMenuContext } from '../contexts/menuContext';
import { useMenuListContext } from '../contexts/menuListContext';

/**
 * A component can be a part of a submenu whether its menu context `isSubmenu` flag is true
 * or whether it is a part of a `MenuList`
 *
 * A simple hook to check box contexts easily
 *
 * @returns whether the component is part of a submenu
 */
export function useIsSubmenu() {
  const menuContextValue = useMenuContext(context => context.isSubmenu);
  const menuListContextValue = useMenuListContext(context => context.hasMenuListContext);

  return menuContextValue || menuListContextValue;
}
