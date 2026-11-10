import { StartEnd } from '../patterns/start-end.js';
import { applyMixins } from '../utils/apply-mixins.js';
import { swapStates } from '../utils/element-internals.js';
import { BaseTextInput } from './text-input.base.js';
import type { TextInputAppearance, TextInputControlSize } from './text-input.options.js';

/**
 * A Text Input Custom HTML Element.
 * Based on BaseTextInput and includes style and layout specific attributes
 *
 * @tag fluent-text-input
 * @fires { Event } change - Fired when the input value is committed via a change event.
 * @fires { Event } select - Fires when the `select()` method is called.
 * @presentational {TextInputAppearance | undefined} appearance - Indicates the styled appearance of the element.
 * @presentational {TextInputControlSize | undefined} control-size - Sets the size of the control.
 *
 * @public
 */
export class TextInput extends BaseTextInput {}

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
