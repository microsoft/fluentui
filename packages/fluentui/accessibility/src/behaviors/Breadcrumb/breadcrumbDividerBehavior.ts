import { Accessibility } from '../../types';

/**
 * @specification
 * Indicator is usually only visual representation and therefore is hidden from screen readers, unless 'aria-label' property is provided.
 */
export const BreadcrumbDividerBehavior: Accessibility<BreadcrumbDividerBehaviorProps> = () => ({
  attributes: {
    root: {
      'aria-hidden': true,
    },
  },
});

export type BreadcrumbDividerBehaviorProps = never;
