import { attr, FASTElement } from '@microsoft/fast-element';
import { toggleAttrState } from '../utils/element-internals.js';
import type { SpinnerAppearance, SpinnerSize } from './spinner.options.js';

/**
 * The base class used for constructing a fluent-spinner custom element
 * @public
 */
export class BaseSpinner extends FASTElement {
  /**
   * The internal {@link https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  constructor() {
    super();
    this.elementInternals.role = 'progressbar';
  }
}

/**
 * A Spinner Custom HTML Element.
 * Based on BaseSpinner and includes style and layout specific attributes
 *
 * @public
 */
export class Spinner extends BaseSpinner {
  /**
   * The size of the spinner
   *
   * @public
   * @remarks
   * HTML Attribute: size
   */
  @toggleAttrState
  @attr
  public size?: SpinnerSize;

  /**
   * The appearance of the spinner
   * @public
   * @remarks
   * HTML Attribute: appearance
   */
  @toggleAttrState
  @attr
  public appearance?: SpinnerAppearance;
}
