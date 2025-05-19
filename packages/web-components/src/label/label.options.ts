import type { ValuesOf } from '../utils/index.js';
import type { BaseLabel } from './label.base.js';

/**
 * Predicate function that determines if the element should be considered a label.
 *
 * @param element - The element to check.
 * @param tagName - The tag name to check.
 * @returns true if the element is a label.
 * @public
 */
export function isLabel(element?: Element | Node | null, tagName: string = '-label'): element is BaseLabel {
  if (element?.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }

  return (element as Element).tagName.toLowerCase().endsWith(tagName);
}

/**
 * A Labels font size can be small, medium, or large
 */
export const LabelSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

/**
 * Applies font size to label
 * @public
 */
export type LabelSize = ValuesOf<typeof LabelSize>;

/**
 * A label can have a font weight of regular or strong
 */
export const LabelWeight = {
  regular: 'regular',
  semibold: 'semibold',
} as const;

/**
 * Applies font weight to label
 * @public
 */
export type LabelWeight = ValuesOf<typeof LabelWeight>;
