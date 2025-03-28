import type { StaticallyComposableHTML } from '../utils/index.js';
import { BaseCheckbox } from '../checkbox/checkbox.base.js';

export type SwitchOptions = {
  switch?: StaticallyComposableHTML<Switch>;
};

/**
 * A Switch Custom HTML Element.
 * Implements the {@link https://w3c.github.io/aria/#switch | ARIA switch }.
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
