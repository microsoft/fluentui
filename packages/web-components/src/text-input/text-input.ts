import { attr } from '@microsoft/fast-element';
import { StartEnd } from '../patterns/start-end.js';
import { applyMixins } from '../utils/apply-mixins.js';
import { swapStates } from '../utils/element-internals.js';
import { BaseTextInput } from './text-input.base.js';
import { TextInputAppearance, TextInputControlSize } from './text-input.options.js';

/**
 * A Text Input Custom HTML Element.
 * Based on BaseTextInput and includes style and layout specific attributes
 *
 * @tag fluent-text-input
 */
export class TextInput extends BaseTextInput {
  /**
   * Indicates the styled appearance of the element.
   *
   * @public
   * @remarks
   * HTML Attribute: `appearance`
   */
  @attr
  public appearance?: TextInputAppearance;

  /**
   * Handles changes to appearance attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public appearanceChanged(prev: TextInputAppearance | undefined, next: TextInputAppearance | undefined) {
    swapStates(this.elementInternals, prev, next, TextInputAppearance);
  }

  /**
   * Sets the size of the control.
   *
   * @public
   * @remarks
   * HTML Attribute: `control-size`
   */
  @attr({ attribute: 'control-size' })
  public controlSize?: TextInputControlSize;

  /**
   * Handles changes to `control-size` attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public controlSizeChanged(prev: TextInputControlSize | undefined, next: TextInputControlSize | undefined) {
    swapStates(this.elementInternals, prev, next, TextInputControlSize);
  }
}

/**
 * @internal
 * @privateRemarks
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/rushstack/issues/1308
 */
/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
export interface TextInput extends StartEnd {}
applyMixins(TextInput, StartEnd);
