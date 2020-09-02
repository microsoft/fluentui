import { Accessibility } from '../../types';

/**
 * @description
 * Indicator is usually only visual representation and therefore is hidden from screen readers, unless 'aria-label' property is provided.
 *
 * @specification
 * Adds role='img'.
 * Adds attribute 'aria-hidden=true' to 'root' slot.
 */
export const indicatorBehavior: Accessibility<IndicatorBehaviorProps> = () => ({
  attributes: {
    root: {
      role: 'img',
      'aria-hidden': 'true',
    },
  },
});

export type IndicatorBehaviorProps = never;
