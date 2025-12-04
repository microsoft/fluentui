import { attr } from '@microsoft/fast-element';
import { applyMixins } from '../utils/apply-mixins.js';
import { StartEnd } from '../patterns/index.js';
import {
  CounterBadgeAppearance,
  CounterBadgeColor,
  CounterBadgeShape,
  CounterBadgeSize,
} from './counter-badge.options.js';
import { BaseCounterBadge } from './counter-badge.base';

/**
 * A CounterBadge Custom HTML Element.
 * Based on BaseCounterBadge and includes style and layout specific attributes
 *
 * @tag fluent-counter-badge
 *
 */
export class CounterBadge extends BaseCounterBadge {
  /**
   * The appearance the badge should have.
   *
   * @public
   * @remarks
   * HTML Attribute: appearance
   */
  @attr
  public appearance?: CounterBadgeAppearance;

  /**
   * The color the badge should have.
   *
   * @public
   * @remarks
   * HTML Attribute: color
   */
  @attr
  public color?: CounterBadgeColor;

  /**
   * The shape the badge should have.
   *
   * @public
   * @remarks
   * HTML Attribute: shape
   */
  @attr
  public shape?: CounterBadgeShape;

  /**
   * The size the badge should have.
   *
   * @public
   * @remarks
   * HTML Attribute: size
   */
  @attr
  public size?: CounterBadgeSize;
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API extractor.
 * TODO: Below will be unnecessary when Badge class gets updated
 * @internal
 */
/* eslint-disable-next-line */
export interface CounterBadge extends StartEnd {}
applyMixins(CounterBadge, StartEnd);
