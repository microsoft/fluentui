import { attr } from '@microsoft/fast-element';
import { swapStates, toggleState } from '../utils/element-internals.js';
import { DividerAlignContent, DividerAppearance } from './divider.options.js';
import { BaseDivider } from './divider.base.js';

/**
 * A Divider Custom HTML Element.
 * Based on BaseDivider and includes style and layout specific attributes
 *
 * @tag fluent-divider
 *
 */
export class Divider extends BaseDivider {
  /**
   * @public
   * @remarks
   * Determines the alignment of the content within the divider. Select from start or end. When not specified, the content will be aligned to the center.
   */
  @attr({ attribute: 'align-content' })
  public alignContent?: DividerAlignContent;

  /**
   * Handles changes to align-content attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public alignContentChanged(prev: DividerAlignContent | undefined, next: DividerAlignContent | undefined) {
    swapStates(this.elementInternals, prev, next, DividerAlignContent, 'align-');
  }

  /**
   * @public
   * @remarks
   * A divider can have one of the preset appearances. Select from strong, brand, subtle. When not specified, the divider has its default appearance.
   */
  @attr
  public appearance?: DividerAppearance;

  /**
   * Handles changes to appearance attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public appearanceChanged(prev: DividerAppearance | undefined, next: DividerAppearance | undefined) {
    swapStates(this.elementInternals, prev, next, DividerAppearance);
  }

  /**
   * @public
   * @remarks
   * Adds padding to the beginning and end of the divider.
   */
  @attr({ mode: 'boolean' })
  public inset?: boolean;

  /**
   * Handles changes to inset custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public insetChanged(prev: boolean, next: boolean) {
    toggleState(this.elementInternals, 'inset', next);
  }
}
