import { MenuItem, MenuItemOptions, menuItemTemplate as template } from '@microsoft/fast-foundation';
import { menuItemStyles as styles } from './menu-item.styles';

/**
 * The Fluent Menu Item Element. Implements {@link @microsoft/fast-foundation#MenuItem},
 * {@link @microsoft/fast-foundation#menuItemTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-menu-item\>
 */
export const fluentMenuItem = MenuItem.compose<MenuItemOptions>({
  baseName: 'menu-item',
  template,
  styles,
  checkboxIndicator: `
    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.86 3.66a.5.5 0 01-.02.7l-7.93 7.48a.6.6 0 01-.84-.02L2.4 9.1a.5.5 0 01.72-.7l2.4 2.44 7.65-7.2a.5.5 0 01.7.02z"/>
    </svg>
  `,
  expandCollapseGlyph: `
    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.65 3.15a.5.5 0 000 .7L9.79 8l-4.14 4.15a.5.5 0 00.7.7l4.5-4.5a.5.5 0 000-.7l-4.5-4.5a.5.5 0 00-.7 0z"/>
    </svg>
  `,
  radioIndicator: `
    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="2"/>
    </svg>
  `,
});

/**
 * Styles for MenuItem
 * @public
 */
export const menuItemStyles = styles;

/**
 * Menu item base class
 * @public
 */
export { MenuItem };
