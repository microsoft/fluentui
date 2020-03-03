import { Accessibility, AccessibilityAttributes } from '../../types';

/**
 * @description
 * Indicator is usually only visual representation and therefore is hidden from screen readers, unless 'aria-label' property is provided.
 *
 * @specification
 * Adds role='img'.
 * Adds attribute 'aria-hidden=true', if there is no 'aria-label' property provided.
 */
const indicatorBehavior: Accessibility<IndicatorBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'img',
      'aria-hidden': props['aria-label'] ? undefined : 'true'
    }
  }
});

export default indicatorBehavior;

export type IndicatorBehaviorProps = Pick<AccessibilityAttributes, 'aria-label'>;
