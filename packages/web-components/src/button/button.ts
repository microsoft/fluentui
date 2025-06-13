import { attr } from '@microsoft/fast-element';
import { StartEnd } from '../patterns/index.js';
import { applyMixins } from '../utils/apply-mixins.js';
import { BaseButton } from './button.base.js';
import { ButtonAppearance, ButtonShape, ButtonSize } from './button.options.js';

/**
 * A Button Custom HTML Element.
 * Based on BaseButton and includes style and layout specific attributes
 *
 * @tag fluent-button
 *
 * @public
 */
export class Button extends BaseButton {
  /**
   * Indicates the styled appearance of the button.
   *
   * @public
   * @remarks
   * HTML Attribute: `appearance`
   */
  @attr
  public appearance?: ButtonAppearance;

  /**
   * The shape of the button.
   *
   * @public
   * @remarks
   * HTML Attribute: `shape`
   */
  @attr
  public shape?: ButtonShape;

  /**
   * The size of the button.
   *
   * @public
   * @remarks
   * HTML Attribute: `size`
   */
  @attr
  public size?: ButtonSize;

  /**
   * Indicates that the button should only display as an icon with no text content.
   *
   * @public
   * @remarks
   * HTML Attribute: `icon-only`
   */
  @attr({ attribute: 'icon-only', mode: 'boolean' })
  public iconOnly: boolean = false;
}

/**
 * @internal
 * @privateRemarks
 * Mark internal because exporting class and interface of the same name confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 */
/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
export interface Button extends StartEnd {}
applyMixins(Button, StartEnd);
