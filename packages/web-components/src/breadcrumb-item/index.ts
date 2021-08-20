import { BreadcrumbItem, breadcrumbItemTemplate as template } from '@microsoft/fast-foundation';
import type { BreadcrumbItemOptions } from '@microsoft/fast-foundation';
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
    <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg%22%3E">
      <path
        d="M7.65 4.15c.2-.2.5-.2.7 0l5.49 5.46c.21.22.21.57 0 .78l-5.49 5.46a.5.5 0 01-.7-.7L12.8 10 7.65 4.85a.5.5 0 010-.7z"
      />
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
