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
    <svg
        aria-hidden="true"
        part="checkbox-indicator"
        class="checkbox-indicator"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.143 12.6697L15.235 4.5L16.8 5.90363L8.23812 15.7667L3.80005 11.2556L5.27591 9.7555L8.143 12.6697Z"
        />
    </svg>
  `,
  expandCollapseGlyph: `
    <svg
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        class="expand-collapse-glyph"
        part="expand-collapse-glyph"
    >
        <path
            d="M5.00001 12.3263C5.00124 12.5147 5.05566 12.699 5.15699 12.8578C5.25831 13.0167 5.40243 13.1437 5.57273 13.2242C5.74304 13.3047 5.9326 13.3354 6.11959 13.3128C6.30659 13.2902 6.4834 13.2152 6.62967 13.0965L10.8988 8.83532C11.0739 8.69473 11.2153 8.51658 11.3124 8.31402C11.4096 8.11146 11.46 7.88966 11.46 7.66499C11.46 7.44033 11.4096 7.21853 11.3124 7.01597C11.2153 6.81341 11.0739 6.63526 10.8988 6.49467L6.62967 2.22347C6.48274 2.10422 6.30501 2.02912 6.11712 2.00691C5.92923 1.9847 5.73889 2.01628 5.56823 2.09799C5.39757 2.17969 5.25358 2.30817 5.153 2.46849C5.05241 2.62882 4.99936 2.8144 5.00001 3.00369V12.3263Z"
        />
    </svg>
  `,
  radioIndicator: `
    <svg
      aria-hidden="true"
      part="radio-indicator"
      class="radio-indicator"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.143 12.6697L15.235 4.5L16.8 5.90363L8.23812 15.7667L3.80005 11.2556L5.27591 9.7555L8.143 12.6697Z"
      />
    </svg>
  `,
});

/**
 * Styles for MenuItem
 * @public
 */
export const menuItemStyles = styles;
