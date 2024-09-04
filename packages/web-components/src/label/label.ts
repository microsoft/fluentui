import { attr, FASTElement } from '@microsoft/fast-element';
import { toggleAttrState } from '../utils/element-internals.js';
import { LabelSize, LabelWeight } from './label.options.js';

/**
 * The base class used for constructing a fluent-label custom element
 * @public
 */
export class Label extends FASTElement {
  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /**
   * 	Specifies font size of a label
   *
   * @public
   * @remarks
   * HTML Attribute: size
   */
  @toggleAttrState
  @attr
  public size?: LabelSize;

  /**
   * 	Specifies font weight of a label
   *
   * @public
   * @remarks
   * HTML Attribute: weight
   */
  @toggleAttrState
  @attr
  public weight?: LabelWeight;

  /**
   * 	Specifies styles for label when associated input is disabled
   *
   * @public
   * @remarks
   * HTML Attribute: disabled
   */
  @toggleAttrState
  @attr({ mode: 'boolean' })
  public disabled: boolean = false;

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
