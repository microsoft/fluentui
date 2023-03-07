import { attr } from '@microsoft/fast-element';
import { FASTRadio } from '@microsoft/fast-foundation';

/**
 * The base class used for constructing a fluent-radio custom element
 * @public
 */
export class Radio extends FASTRadio {
  /**
   * sets radio layout styles
   *
   * @public
   * @remarks
   * HTML Attribute: stack
   */
  @attr({ mode: 'boolean' })
  public stack: boolean = false;
}
