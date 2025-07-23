import { attr } from '@microsoft/fast-element';
import type { StartEndOptions } from '../patterns/index.js';
import { StartEnd } from '../patterns/index.js';
import { applyMixins } from '../utils/apply-mixins.js';
import { swapStates, toggleState } from '../utils/element-internals.js';
import { BaseAnchor } from './anchor-button.base.js';
import { AnchorButtonAppearance, AnchorButtonShape, AnchorButtonSize } from './anchor-button.options.js';

/**
 * Anchor configuration options
 *
 * @tag fluent-anchor-button
 *
 * @public
 */
export type AnchorOptions = StartEndOptions<AnchorButton>;

/**
 * An Anchor Custom HTML Element.
 * Based on BaseAnchor and includes style and layout specific attributes
 *
 * @public
 */
export class AnchorButton extends BaseAnchor {
  /**
   * The appearance the anchor button should have.
   *
   * @public
   * @remarks
   * HTML Attribute: `appearance`
   */
  @attr
  public appearance?: AnchorButtonAppearance | undefined;

  /**
   * Handles changes to appearance attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public appearanceChanged(prev: AnchorButtonAppearance | undefined, next: AnchorButtonAppearance | undefined) {
    swapStates(this.elementInternals, prev, next, AnchorButtonAppearance);
  }

  /**
   * The shape the anchor button should have.
   *
   * @public
   * @remarks
   * HTML Attribute: `shape`
   */
  @attr
  public shape?: AnchorButtonShape | undefined;

  /**
   * Handles changes to shape attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public shapeChanged(prev: AnchorButtonShape | undefined, next: AnchorButtonShape | undefined) {
    swapStates(this.elementInternals, prev, next, AnchorButtonShape);
  }

  /**
   * The size the anchor button should have.
   *
   * @public
   * @remarks
   * HTML Attribute: `size`
   */
  @attr
  public size?: AnchorButtonSize;

  /**
   * Handles changes to size attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public sizeChanged(prev: AnchorButtonSize | undefined, next: AnchorButtonSize | undefined) {
    swapStates(this.elementInternals, prev, next, AnchorButtonSize);
  }

  /**
   * The anchor button has an icon only, no text content
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
    toggleState(this.elementInternals, 'icon', !!next);
  }
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
export interface AnchorButton extends StartEnd {}
applyMixins(AnchorButton, StartEnd);
