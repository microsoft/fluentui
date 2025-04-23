import { attr, FASTElement } from '@microsoft/fast-element';
import { applyMixins } from '../utils/apply-mixins.js';
import { StartEnd } from '../patterns/index.js';
import { BadgeAppearance, BadgeColor, BadgeShape, BadgeSize } from './badge.options.js';

/**
 * The base class used for constructing a fluent-badge custom element
 * @public
 */
export class Badge extends FASTElement {
  /**
   * The appearance the badge should have.
   *
   * @tag fluent-badge
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
