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
 *
 * @public
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
   * Sets the size of the control.
   *
   * @public
   * @remarks
   * HTML Attribute: `control-size`
   */
  @attr({ attribute: 'control-size' })
  public controlSize?: TextInputControlSize;
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
