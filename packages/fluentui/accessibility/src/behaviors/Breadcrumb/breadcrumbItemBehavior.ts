import { Accessibility } from '../../types';

/**
 * @specification
 * Adds role='listitem' if element type is 'breadcrumbitem'. This allows screen readers to handle the component as a listitem.
 */
export const breadcrumbItemBehavior: Accessibility<BreadcrumbItemBehaviorProps> = () => ({
  attributes: {
    root: {
      role: 'listitem',
    },
  },
});

export type BreadcrumbItemBehaviorProps = never;
