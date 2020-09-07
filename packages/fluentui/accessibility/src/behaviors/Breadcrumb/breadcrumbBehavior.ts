import { Accessibility } from '../../types';

/**
 * @specification
 * Adds role 'list' to 'list' slot.
 */
export const breadcrumbBehavior: Accessibility<BreadcrumbBehaviorProps> = props => ({
  attributes: {
    list: {
      role: 'list',
    },
  },
});

export type BreadcrumbBehaviorProps = never;
