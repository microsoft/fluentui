import { BaseCheckbox } from '../checkbox/checkbox.js';

/**
 * Base class for an Option custom element.
 *
 * @public
 */
export class BaseOption extends BaseCheckbox {
  constructor() {
    super();

    this.elementInternals.role = 'option';
  }
}

/**
 * An option custom element.
 *
 * @public
 */
export class Option extends BaseOption {}
