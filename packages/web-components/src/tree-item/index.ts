import { treeItemTemplate as template, TreeItem, TreeItemOptions } from '@microsoft/fast-foundation';
import { treeItemStyles as styles } from './tree-item.styles';

/**
 * The Fluent tree item Custom Element. Implements, {@link @microsoft/fast-foundation#TreeItem}
 * {@link @microsoft/fast-foundation#treeItemTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-tree-item\>
 *
 */
export const fluentTreeItem = TreeItem.compose<TreeItemOptions>({
  baseName: 'tree-item',
  template,
  styles,
  expandCollapseGlyph: `
    <svg
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        class="expand-collapse-glyph"
    >
        <path
            d="M5.00001 12.3263C5.00124 12.5147 5.05566 12.699 5.15699 12.8578C5.25831 13.0167 5.40243 13.1437 5.57273 13.2242C5.74304 13.3047 5.9326 13.3354 6.11959 13.3128C6.30659 13.2902 6.4834 13.2152 6.62967 13.0965L10.8988 8.83532C11.0739 8.69473 11.2153 8.51658 11.3124 8.31402C11.4096 8.11146 11.46 7.88966 11.46 7.66499C11.46 7.44033 11.4096 7.21853 11.3124 7.01597C11.2153 6.81341 11.0739 6.63526 10.8988 6.49467L6.62967 2.22347C6.48274 2.10422 6.30501 2.02912 6.11712 2.00691C5.92923 1.9847 5.73889 2.01628 5.56823 2.09799C5.39757 2.17969 5.25358 2.30817 5.153 2.46849C5.05241 2.62882 4.99936 2.8144 5.00001 3.00369V12.3263Z"
        />
    </svg>
  `,
});

/**
 * Styles for TreeItem
 * @public
 */
export const treeItemStyles = styles;
