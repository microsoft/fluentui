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
    <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.65 2.15a.5.5 0 000 .7L7.79 6 4.65 9.15a.5.5 0 10.7.7l3.5-3.5a.5.5 0 000-.7l-3.5-3.5a.5.5 0 00-.7 0z"/>
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
