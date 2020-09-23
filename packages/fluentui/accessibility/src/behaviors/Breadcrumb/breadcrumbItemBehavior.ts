import { Accessibility } from '../../types';

/**
 * @specification
 * Adds role='listitem'.
 */
export const breadcrumbItemBehavior: Accessibility<BreadcrumbItemBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'listitem',
    },
  },
});

export type BreadcrumbItemBehaviorProps = never;
