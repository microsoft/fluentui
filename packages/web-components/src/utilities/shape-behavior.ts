import { ElementStyles } from '@microsoft/fast-element';
import { PropertyStyleSheetBehavior } from '@microsoft/fast-foundation';

/**
 * Behavior that will conditionally apply a stylesheet based on the elements
 * shape property
 *
 * @param value - The value of the shape property
 * @param styles - The styles to be applied when condition matches
 *
 * @public
 */
export function shapeBehavior(value: string, styles: ElementStyles) {
  return new PropertyStyleSheetBehavior('shape', value, styles);
}
