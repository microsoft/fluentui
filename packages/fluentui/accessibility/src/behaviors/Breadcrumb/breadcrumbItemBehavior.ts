import { Accessibility } from '../../types';

/**
 * @specification
 * Adds role='listitem'.
 */
export const breadcrumbItemBehavior: Accessibility<BreadcrumbItemBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'listitem',
      ...(props.current && { 'aria-current': 'page' }),
    },
  },
});

export type BreadcrumbItemBehaviorProps = {
  current?: boolean;
};
