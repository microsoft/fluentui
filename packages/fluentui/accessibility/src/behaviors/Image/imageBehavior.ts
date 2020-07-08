import { Accessibility, AccessibilityAttributes } from '../../types';

/**
 * @description
 * Image is usually only visual representation and therefore is hidden from screen readers, unless 'alt' property is provided.
 *
 * @specification
 * Adds attribute 'aria-hidden=true', if there is no 'alt' property provided.
 */
export const imageBehavior: Accessibility<ImageBehaviorProps> = props => ({
  attributes: {
    root: {
      'aria-hidden': props.alt || props['aria-label'] ? undefined : 'true',
    },
  },
});

export type ImageBehaviorProps = {
  /** Alternative text. */
  alt?: string;
} & Pick<AccessibilityAttributes, 'aria-label'>;
