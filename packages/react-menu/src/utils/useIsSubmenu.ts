import { useHasParentContext } from '@fluentui/react-context-selector';
import { useMenuContext_unstable } from '../contexts/menuContext';
import { MenuListContext } from '../contexts/menuListContext';

/**
 * A component can be a part of a submenu whether its menu context `isSubmenu` flag is true
 * or whether it is a part of a `MenuList`
 *
 * A simple hook to check box contexts easily
 *
 * @returns whether the component is part of a submenu
 */
export function useIsSubmenu() {
  const menuContextValue = useMenuContext_unstable(context => context.isSubmenu);
  const hasMenuListContext = useHasParentContext(MenuListContext);

  return menuContextValue || hasMenuListContext;
}
