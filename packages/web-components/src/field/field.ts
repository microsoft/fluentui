import { BaseField } from './field.base.js';
import type { LabelPosition } from './field.options.js';

/**
 * A Field Custom HTML Element.
 * Based on BaseField and includes style and layout specific attributes
 *
 * @tag fluent-field
 *
 * @slot label - Label content associated with the control.
 * @slot input - Input control content.
 * @slot message - Validation and helper message content.
 * @csspart label - The label slot container.
 * @csspart input - The input slot container.
 * @csspart message - The message slot container.
 *
 * @presentational {LabelPosition} [label-position=above] - The position of the label relative to the input.
 *
 * @public
 */
export class Field extends BaseField {}
