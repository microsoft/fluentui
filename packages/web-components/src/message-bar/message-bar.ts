import { attr, FASTElement } from '@microsoft/fast-element';
import { toggleState } from '../utils/element-internals.js';
import { MessageBarIntent, MessageBarLayout, MessageBarShape } from './message-bar.options.js';

/**
 * A Message Bar Custom HTML Element.
 *
 * @slot actions - Content that can be provided for the actions
 * @slot dismiss - Content that can be provided for the dismiss button
 * @slot - The default slot for the content
 * @public
 */
export class MessageBar extends FASTElement {
  /**
   * The internal {@link https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  constructor() {
    super();
    this.elementInternals.role = 'status';
  }

  /**
   * Sets the shape of the Message Bar.
   *
   * @public
   * @remarks
   * HTML Attribute: `shape`
   */
  @attr
  public shape?: MessageBarShape;

  /**
   * Handles changes to shape attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public shapeChanged(prev: MessageBarShape | undefined, next: MessageBarShape | undefined) {
    if (prev) {
      toggleState(this.elementInternals, prev, false);
    }
    if (next) {
      toggleState(this.elementInternals, next, true);
    }
  }

  /**
   * Sets the layout of the control.
   *
   * @public
   * @remarks
   * HTML Attribute: `layout`
   */
  @attr
  public layout?: MessageBarLayout;

  /**
   * Handles changes to the layout attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public layoutChanged(prev: MessageBarLayout | undefined, next: MessageBarLayout | undefined) {
    if (prev) {
      toggleState(this.elementInternals, prev, false);
    }
    if (next) {
      toggleState(this.elementInternals, next, true);
    }
  }

  /**
   * Sets the intent of the control.
   *
   * @public
   * @remarks
   * HTML Attribute: `intent`
   */
  @attr
  public intent?: MessageBarIntent;

  /**
   * Handles changes to the intent attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public intentChanged(prev: MessageBarIntent | undefined, next: MessageBarIntent | undefined) {
    if (prev) {
      toggleState(this.elementInternals, prev, false);
    }
    if (next) {
      toggleState(this.elementInternals, next, true);
    }
  }

  /**
   * @public
   * Method to emit a `dismiss` event when the message bar is dismissed
   */
  public dismissMessageBar = () => {
    this.$emit('dismiss', {});
  };
}
