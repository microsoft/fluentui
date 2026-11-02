import { attr } from '@microsoft/fast-element';
import { StartEnd } from '../patterns/start-end.js';
import { applyMixins } from '../utils/apply-mixins.js';
import { BaseCounterBadge } from './counter-badge.base.js';
import {
  CounterBadgeAppearance,
  CounterBadgeColor,
  CounterBadgeShape,
  CounterBadgeSize,
} from './counter-badge.options.js';

/**
 * A CounterBadge Custom HTML Element.
 * Based on BaseCounterBadge and includes style and layout specific attributes.
 *
 * @tag fluent-counter-badge
 *
 * @slot start - Content which can be provided before the badge content.
 * @slot end - Content which can be provided after the badge content.
 *
 * @public
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

/* eslint-disable-next-line */
export interface CounterBadge extends StartEnd {}
applyMixins(CounterBadge, StartEnd);
