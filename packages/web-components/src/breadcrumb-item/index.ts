import { BreadcrumbItem, breadcrumbItemTemplate as template } from '@microsoft/fast-foundation';
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
export const fluentBreadcrumbItem = BreadcrumbItem.compose({
  baseName: 'breadcrumb-item',
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
});

/**
 * Styles for BreadcrumbItem
 * @public
 */
export const breadcrumbItemStyles = styles;
