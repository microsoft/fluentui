import { attr } from '@microsoft/fast-element';
import { StartEnd } from '../patterns/index.js';
import { applyMixins } from '../utils/apply-mixins.js';
import { swapStates, toggleState } from '../utils/element-internals.js';
import { BaseButton } from './button.base.js';
import { ButtonAppearance, ButtonShape, ButtonSize } from './button.options.js';

/**
 * A Button Custom HTML Element.
 * Based on BaseButton and includes style and layout specific attributes
 *
 * @tag fluent-button
 * 
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
   * Handles changes to appearance attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public appearanceChanged(prev: ButtonAppearance | undefined, next: ButtonAppearance | undefined) {
    swapStates(this.elementInternals, prev, next, ButtonAppearance);
  }

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
   * Handles changes to shape attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public shapeChanged(prev: ButtonShape | undefined, next: ButtonShape | undefined) {
    swapStates(this.elementInternals, prev, next, ButtonShape);
  }

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
   * Handles changes to size attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public sizeChanged(prev: ButtonSize | undefined, next: ButtonSize | undefined) {
    swapStates(this.elementInternals, prev, next, ButtonSize);
  }

  /**
   * Indicates that the button should only display as an icon with no text content.
   *
   * @public
   * @remarks
   * HTML Attribute: `icon-only`
   */
  @attr({ attribute: 'icon-only', mode: 'boolean' })
  public iconOnly: boolean = false;

  /**
   * Handles changes to icon only custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public iconOnlyChanged(prev: boolean, next: boolean) {
    toggleState(this.elementInternals, 'icon', next);
  }
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
