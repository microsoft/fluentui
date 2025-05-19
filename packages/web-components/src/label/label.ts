import { attr } from '@microsoft/fast-element';
import { BaseLabel } from './label.base.js';
import type { LabelSize, LabelWeight } from './label.options.js';

/**
 * The Fluent Label Element. Implements {@link BaseLabel}.
 *
 * @tag fluent-label
 *
 * @public
 */
export class Label extends BaseLabel {
  /**
   * The size of the label.
   *
   * @public
   * @remarks
   * HTML Attribute: `size`
   */
  @attr
  public size?: LabelSize;

  /**
   * The font weight of the label.
   *
   * @public
   * @remarks
   * HTML Attribute: `weight`
   */
  @attr
  public weight?: LabelWeight;
}
