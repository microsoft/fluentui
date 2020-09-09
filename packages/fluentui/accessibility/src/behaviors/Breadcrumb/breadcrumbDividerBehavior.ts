import { Accessibility } from '../../types';

/**
 * @description
 * Breadcrumb divider is usually only visual representation and therefore is hidden from screen readers.
 *
 * @specification
 * Adds attribute 'aria-hidden=true' to 'root' slot.
 */
export const breadcrumbDividerBehavior: Accessibility<BreadcrumbDividerBehaviorProps> = () => ({
  attributes: {
    root: {
      'aria-hidden': true,
    },
  },
});

export type BreadcrumbDividerBehaviorProps = never;
