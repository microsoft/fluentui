import { Accessibility } from '../../types';

/**
 * @specification
 * Adds role='listitem'.
 */
export const breadcrumbItemBehavior: Accessibility<BreadcrumbItemBehaviorProps> = () => ({
  attributes: {
    root: {
      role: 'listitem',
    },
  },
});

export type BreadcrumbItemBehaviorProps = never;
