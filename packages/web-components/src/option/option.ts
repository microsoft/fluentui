import { BaseCheckbox } from '../checkbox/checkbox.js';

/**
 * Base class for an Option custom element.
 *
 * @public
 */
export class BaseOption extends BaseCheckbox {
  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

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
