import { customElement } from '@microsoft/fast-element';
import { Breadcrumb, BreadcrumbTemplate as template } from '@microsoft/fast-foundation';
import { BreadcrumbStyles as styles } from './breadcrumb.styles';

/**
 * The Fluent Breadcrumb Element. Implements {@link @microsoft/fast-foundation#Breadcrumb},
 * {@link @microsoft/fast-foundation#BreadcrumbTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-breadcrumb\>
 */
@customElement({
  name: 'fluent-breadcrumb',
  template,
  styles,
})
export class FluentBreadcrumb extends Breadcrumb {}

/**
 * Styles for Breadcrumb
 * @public
 */
export const BreadcrumbStyles = styles;
