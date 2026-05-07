import type { StaticallyComposableHTML } from '../utils/template-helpers.js';
import { isCustomElement } from '../utils/typings.js';
import type { Radio } from './radio.js';

/**
 * @public
 */
export type RadioControl = Pick<HTMLInputElement, 'checked' | 'disabled' | 'focus' | 'setAttribute' | 'getAttribute'>;

/**
 * Radio configuration options
 * @public
 */
export type RadioOptions = {
  checkedIndicator?: StaticallyComposableHTML<Radio>;
};

export type { CheckboxSize as RadioSize } from '../checkbox/checkbox.options.js';

/**
 * Predicate function that determines if the element should be considered a radio element.
 *
 * @param element - The element to check.
 * @param tagName - The tag name to check against, defaults to '-radio'.
 * @returns True if the element is a radio element, false otherwise.
 * @public
 */
export function isRadio(element?: Node | null, tagName: string = '-radio'): element is Radio {
  return isCustomElement(tagName)(element);
}
