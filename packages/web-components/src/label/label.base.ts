import { attr, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { labelElementTemplate } from './label.template.js';

/**
 * The base class used for constructing a fluent-label custom element
 *
 * @tag fluent-label
 *
 * @public
 */
export class BaseLabel extends FASTElement {
  /**
   * 	Specifies styles for label when associated input is disabled
   *
   * @public
   * @remarks
   * HTML Attribute: `disabled`
   */
  @attr({ mode: 'boolean' })
  public disabled: boolean = false;

  /**
   * The label's for attribute.
   *
   * @public
   * @remarks
   * HTML Attribute: `for`
   */
  @attr({ attribute: 'for' })
  public htmlFor!: string;

  /**
   * 	Specifies styles for label when associated input is a required field
   *
   * @public
   * @remarks
   * HTML Attribute: `required`
   */
  @attr({ mode: 'boolean' })
  public required: boolean = false;
}
