import { attr, FASTElement } from '@microsoft/fast-element';
import { applyMixins } from '../../utils/apply-mixins.js';
import { StartEnd } from '../../patterns/index.js';
import { toggleState } from '../../utils/element-internals.js';
import { KumoBadgeAppearance } from './badge.options.js';

/**
 * The base class used for constructing a kumo-badge custom element
 * @public
 */
export class KumoBadge extends FASTElement {
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
  public appearance: KumoBadgeAppearance = KumoBadgeAppearance.brand;

  /**
   * Handles changes to appearance attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public appearanceChanged(prev: KumoBadgeAppearance | undefined, next: KumoBadgeAppearance | undefined) {
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
export interface KumoBadge extends StartEnd {}
applyMixins(KumoBadge, StartEnd);
