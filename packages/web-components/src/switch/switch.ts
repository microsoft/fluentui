import type { StaticallyComposableHTML } from '../utils/index.js';
import { BaseCheckbox } from '../checkbox/checkbox.base.js';

export type SwitchOptions = {
  switch?: StaticallyComposableHTML<Switch>;
};

/**
 * A Switch Custom HTML Element.
 * Based on BaseCheckbox and includes style and layout specific attributes
 *
 * @tag fluent-switch
 *
 */
export class Switch extends BaseCheckbox {
  constructor() {
    super();
    this.elementInternals.role = 'switch';
  }
}
