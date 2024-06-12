import { attr, FASTElement } from '@microsoft/fast-element';
import type { SpinnerAppearance, SpinnerSize } from './spinner.options.js';

/**
 * A Spinner component that displays a loading indicator.
 * @class Spinner
 * @extends FASTElement
 *
 * @attr size - The size of the spinner.
 * @attr appearance - The appearance of the spinner.
 *
 * @csspart progress - The SVG element representing the spinner.
 * @csspart background - The background circle of the spinner.
 * @csspart indicator - The indicator circle of the spinner.
 *
 * @slot indicator - Slot for custom spinner indicator content.
 *
 * @summary The Spinner component displays a loading indicator.
 *
 * @tag fluent-spinner
 *
 * @public
 */

export class Spinner extends FASTElement {
  /**
   * The internal {@link https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  protected elementInternals: ElementInternals = this.attachInternals();

  /**
   * The size of the spinner
   *
   * @public
   * @remarks
   * HTML Attribute: size
   */
  @attr
  public size?: SpinnerSize;

  /**
   * The appearance of the spinner
   * @public
   * @remarks
   * HTML Attribute: appearance
   */
  @attr
  public appearance?: SpinnerAppearance;

  constructor() {
    super();
    this.elementInternals.role = 'progressbar';
  }
}
