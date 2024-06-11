import { attr, FASTElement } from '@microsoft/fast-element';
// TODO: Remove with https://github.com/microsoft/fast/pull/6797
import { applyMixins } from '../utils/apply-mixins.js';
import { StartEnd } from '../patterns/index.js';
import { BadgeAppearance, BadgeColor, BadgeShape, BadgeSize } from './badge.options.js';

/**
 * A Badge component used for displaying status or counts.
 * @extends FASTElement
 *
 * @attr appearance - The appearance the badge should have.
 * @attr color - The color the badge should have.
 * @attr shape - The shape the badge should have.
 * @attr size - The size the badge should have.
 *
 * @csspart start - The start slot content.
 * @csspart end - The end slot content.
 * @csspart content - The main content of the badge.
 *
 * @slot - Default slot for the badge's content.
 * @slot start - Slot for content at the start of the badge.
 * @slot end - Slot for content at the end of the badge.
 *
 * @summary The Badge component is used to display status or counts.
 *
 * @tag fluent-badge
 *
 * @public
 */

export class Badge extends FASTElement {
  /**
   * The appearance the badge should have.
   *
   * @public
   * @remarks
   * HTML Attribute: appearance
   */
  @attr
  public appearance: BadgeAppearance = BadgeAppearance.filled;

  /**
   * The color the badge should have.
   *
   * @public
   * @remarks
   * HTML Attribute: color
   */
  @attr
  public color: BadgeColor = BadgeColor.brand;
  /**
   * The shape the badge should have.
   *
   * @public
   * @remarks
   * HTML Attribute: shape
   */
  @attr
  public shape?: BadgeShape;

  /**
   * The size the badge should have.
   *
   * @public
   * @remarks
   * HTML Attribute: size
   */
  @attr
  public size?: BadgeSize;
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API extractor.
 * TODO: Below will be unnecessary when Badge class gets updated
 * @internal
 */
/* eslint-disable-next-line */
export interface Badge extends StartEnd {}
applyMixins(Badge, StartEnd);
