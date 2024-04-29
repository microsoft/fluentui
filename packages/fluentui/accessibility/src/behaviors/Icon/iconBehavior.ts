import { Accessibility, AccessibilityAttributes } from '../../types';

/**
 * @description
 * Icon is usually only visual representation and therefore is hidden from screen readers, unless 'alt' or 'aria-label' property is provided.
 *
 * @specification
 * Adds role='img'.
 * Adds attribute 'aria-hidden=true', if there is no 'alt' property provided.
 * Adds attribute 'aria-hidden=true', if there is no 'aria-label' property provided.
 */
export const iconBehavior: Accessibility<IconBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'img',
      'aria-hidden': props.alt || props['aria-label'] ? undefined : 'true',
    },
  },
});

export type IconBehaviorProps = {
  /** Alternative text. */
  alt?: string;
} & Pick<AccessibilityAttributes, 'aria-label'>;
