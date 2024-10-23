import { attr, FASTElement } from '@microsoft/fast-element';
// TODO: Remove with https://github.com/microsoft/fast/pull/6797
import { applyMixins } from '../utils/apply-mixins.js';
import { StartEnd } from '../patterns/index.js';
import { toggleState } from '../utils/element-internals.js';
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
  @attr
  public appearance: BadgeAppearance = BadgeAppearance.filled;

  /**
   * Handles changes to appearance attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public appearanceChanged(prev: BadgeAppearance | undefined, next: BadgeAppearance | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

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
   * Handles changes to color attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public colorChanged(prev: BadgeColor | undefined, next: BadgeColor | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

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
   * Handles changes to shape attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public shapeChanged(prev: BadgeShape | undefined, next: BadgeShape | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

  /**
   * The size the badge should have.
   *
   * @public
   * @remarks
   * HTML Attribute: size
   */
  @attr
  public size?: BadgeSize;

  /**
   * Handles changes to size attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public sizeChanged(prev: BadgeSize | undefined, next: BadgeSize | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }
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
