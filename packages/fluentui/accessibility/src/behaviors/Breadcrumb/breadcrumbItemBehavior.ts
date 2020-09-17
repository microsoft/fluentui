import { Accessibility } from '../../types';

/**
 * @specification
 * Adds role='gridcell'.
 */
export const breadcrumbItemBehavior: Accessibility<BreadcrumbItemBehaviorProps> = () => ({
  attributes: {
    root: {
      role: 'gridcell',
    },
  },
});

export type BreadcrumbItemBehaviorProps = never;
