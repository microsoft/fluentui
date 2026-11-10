import { StartEnd } from '../patterns/start-end.js';
import { applyMixins } from '../utils/apply-mixins.js';
import { BaseButton } from './button.base.js';
import type { ButtonAppearance, ButtonShape, ButtonSize } from './button.options.js';

/**
 * A Button Custom HTML Element.
 * Based on BaseButton and includes style and layout specific attributes
 *
 * @tag fluent-button
 *
 * @presentational {ButtonAppearance | undefined} appearance - Indicates the styled appearance of the button.
 * @presentational {ButtonShape | undefined} shape - The shape of the button.
 * @presentational {ButtonSize | undefined} size - The size of the button.
 * @presentational {boolean} icon-only - Indicates that the button should only display as an icon with no text content.
 *
 * @public
 */
export class Button extends BaseButton {}

/**
 * @internal
 * @privateRemarks
 * Mark internal because exporting class and interface of the same name confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 */
/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
export interface Button extends StartEnd {}
applyMixins(Button, StartEnd);
