import type { StaticallyComposableHTML } from '../utils/template-helpers.js';
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
