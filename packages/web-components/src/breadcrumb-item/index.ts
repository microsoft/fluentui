import { customElement } from '@microsoft/fast-element';
import { BreadcrumbItem, BreadcrumbItemTemplate as template } from '@microsoft/fast-foundation';
import { BreadcrumbItemStyles as styles } from './breadcrumb-item.styles';

/**
 * The Fluent BreadcrumbItem Element. Implements {@link @microsoft/fast-foundation#BreadcrumbItem},
 * {@link @microsoft/fast-foundation#BreadcrumbItemTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-breadcrumb-item\>
 */
@customElement({
  name: 'fluent-breadcrumb-item',
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
})
export class FluentBreadcrumbItem extends BreadcrumbItem {}

/**
 * Styles for BreadcrumbItem
 * @public
 */
export const BreadcrumbItemStyles = styles;
