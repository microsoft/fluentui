import { attr, FASTElement } from '@microsoft/fast-element';
import type { LabelSize, LabelWeight } from './label.options.js';

/**
 * The base class used for constructing a fluent-label custom element
 *
 * @tag fluent-label
 *
 * @slot - The default slot. Accepts the content of the label.
 * @csspart asterisk - The required-field asterisk indicator.
 *
 * @presentational {LabelSize | undefined} size - Specifies the font size of the label.
 * @presentational {LabelWeight | undefined} weight - Specifies the font weight of the label.
 * @presentational {boolean} disabled - Specifies styles for the label when its associated input is disabled.
 *
 * @public
 */
export class Label extends FASTElement {
  /**
   * 	Specifies styles for label when associated input is a required field
   *
   * @public
   * @remarks
   * HTML Attribute: required
   */
  @attr({ mode: 'boolean' })
  public required: boolean = false;
}
