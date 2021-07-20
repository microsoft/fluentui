import { BreadcrumbItem, BreadcrumbItemOptions, breadcrumbItemTemplate as template } from '@microsoft/fast-foundation';
import { breadcrumbItemStyles as styles } from './breadcrumb-item.styles';

/**
 * The Fluent BreadcrumbItem Element. Implements {@link @microsoft/fast-foundation#BreadcrumbItem},
 * {@link @microsoft/fast-foundation#breadcrumbItemTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-breadcrumb-item\>
 */
export const fluentBreadcrumbItem = BreadcrumbItem.compose<BreadcrumbItemOptions>({
  baseName: 'breadcrumb-item',
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
  separator: `
    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.65 3.15a.5.5 0 000 .7L9.79 8l-4.14 4.15a.5.5 0 00.7.7l4.5-4.5a.5.5 0 000-.7l-4.5-4.5a.5.5 0 00-.7 0z"/>
    </svg>
  `,
});

/**
 * Styles for BreadcrumbItem
 * @public
 */
export const breadcrumbItemStyles = styles;

/**
 * Base class for BreadcrumbItem
 * @public
 */
export { BreadcrumbItem };
