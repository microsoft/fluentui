import { attr, FASTElement } from '@microsoft/fast-element';
import { toggleAttrState, toggleState } from '../utils/element-internals.js';
import { ImageFit, ImageShape } from './image.options.js';

/**
 * The base class used for constucting a fluent image custom element
 * @public
 */
export class Image extends FASTElement {
  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /**
   * Image layout
   *
   * @public
   * @remarks
   * HTML attribute: block.
   */
  @toggleAttrState
  @attr({ mode: 'boolean' })
  public block?: boolean;

  /**
   * Image border
   *
   * @public
   * @remarks
   * HTML attribute: border.
   */
  @toggleAttrState
  @attr({ mode: 'boolean' })
  public bordered?: boolean;

  /**
   * Image shadow
   *
   * @public
   * @remarks
   * HTML attribute: shadow.
   */
  @toggleAttrState
  @attr({ mode: 'boolean' })
  public shadow?: boolean;

  /**
   * Image fit
   *
   * @public
   * @remarks
   * HTML attribute: fit.
   */
  @attr
  public fit?: ImageFit;

  /**
   * Handles changes to fit attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public fitChanged(prev: ImageFit | undefined, next: ImageFit | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `fit-${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `fit-${next}`, true);
    }
  }

  /**
   * Image shape
   *
   * @public
   * @remarks
   * HTML attribute: shape.
   */
  @toggleAttrState
  @attr
  public shape?: ImageShape;
}
