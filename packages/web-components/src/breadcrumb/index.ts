import { Breadcrumb, breadcrumbTemplate as template } from '@microsoft/fast-foundation';
import { breadcrumbStyles as styles } from './breadcrumb.styles';

/**
 * The FAST Breadcrumb Element. Implements {@link @microsoft/fast-foundation#Breadcrumb},
 * {@link @microsoft/fast-foundation#breadcrumbTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-breadcrumb\>
 */
export const fluentBreadcrumb = Breadcrumb.compose({
  baseName: 'breadcrumb',
  template,
  styles,
});

/**
 * Styles for Breadcrumb
 * @public
 */
export const breadcrumbStyles = styles;
