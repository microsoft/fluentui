import { attr, FASTElement } from '@microsoft/fast-element';
// TODO: Remove with https://github.com/microsoft/fast/pull/6797
import { applyMixins } from '../utils/apply-mixins.js';
import { StartEnd } from '../patterns/index.js';
import { toggleAttrState } from '../utils/element-internals.js';
import { BadgeAppearance, BadgeColor, BadgeShape, BadgeSize } from './badge.options.js';

/**
 * The base class used for constructing a fluent-badge custom element
 * @public
 */
export class Badge extends FASTElement {
  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /**
   * The appearance the badge should have.
   *
   * @public
   * @remarks
   * HTML Attribute: appearance
   */
  @toggleAttrState
  @attr
  public appearance: BadgeAppearance = BadgeAppearance.filled;

  /**
   * The color the badge should have.
   *
   * @public
   * @remarks
   * HTML Attribute: color
   */
  @toggleAttrState
  @attr
  public color: BadgeColor = BadgeColor.brand;

  /**
   * The shape the badge should have.
   *
   * @public
   * @remarks
   * HTML Attribute: shape
   */
  @toggleAttrState
  @attr
  public shape?: BadgeShape;

  /**
   * The size the badge should have.
   *
   * @public
   * @remarks
   * HTML Attribute: size
   */
  @toggleAttrState
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
