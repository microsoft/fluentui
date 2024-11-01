import { attr, FASTElement } from '@microsoft/fast-element';
import { swapStates, toggleState } from '../utils/element-internals.js';
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
  @attr({ mode: 'boolean' })
  public block?: boolean;

  /**
   * Handles changes to block custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public blockChanged(prev: boolean, next: boolean) {
    toggleState(this.elementInternals, 'block', next);
  }

  /**
   * Image border
   *
   * @public
   * @remarks
   * HTML attribute: border.
   */
  @attr({ mode: 'boolean' })
  public bordered?: boolean;

  /**
   * Handles changes to bordered custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public borderedChanged(prev: boolean, next: boolean) {
    toggleState(this.elementInternals, 'bordered', next);
  }

  /**
   * Image shadow
   *
   * @public
   * @remarks
   * HTML attribute: shadow.
   */
  @attr({ mode: 'boolean' })
  public shadow?: boolean;

  /**
   * Handles changes to shadow custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public shadowChanged(prev: boolean, next: boolean) {
    toggleState(this.elementInternals, 'shadow', next);
  }

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
    swapStates(this.elementInternals, prev, next, ImageFit, 'fit-');
  }

  /**
   * Image shape
   *
   * @public
   * @remarks
   * HTML attribute: shape.
   */
  @attr
  public shape?: ImageShape;

  /**
   * Handles changes to shape attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public shapeChanged(prev: ImageShape | undefined, next: ImageShape | undefined) {
    swapStates(this.elementInternals, prev, next, ImageShape);
  }
}
