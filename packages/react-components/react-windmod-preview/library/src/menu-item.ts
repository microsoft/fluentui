export {
  MenuItem,
  MenuItemContextProvider,
  menuItemClassNames,
  useMenuItemContext,
  useMenuItemStyles,
} from './components/MenuItem';
export type { MenuItemContextValue, MenuItemProps, MenuItemSlots, MenuItemState } from './components/MenuItem';

/** Headless building blocks, re-exported for consumers composing their own MenuItem. */
export { renderMenuItem, useMenuItem } from '@fluentui/react-headless-components-preview/menu';
