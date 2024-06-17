import { attr, FASTElement } from '@microsoft/fast-element';
import type { StaticallyComposableHTML } from '../utils/index.js';
import { StartEnd } from '../patterns/index.js';
import type { StartEndOptions } from '../patterns/index.js';
import { applyMixins } from '../utils/apply-mixins.js';
import { MessageBarIntent, MessageBarLayout, MessageBarShape } from './message-bar.options.js';

/**
 * MessageBar configuration options
 * @public
 */
export type MessageBarOptions = StartEndOptions<MessageBar> & {
  infoIcon?: StaticallyComposableHTML<MessageBar>;
  errorIcon?: StaticallyComposableHTML<MessageBar>;
  warningIcon?: StaticallyComposableHTML<MessageBar>;
  successIcon?: StaticallyComposableHTML<MessageBar>;
};

/**
 * A Message Bar Custom HTML Element.
 *
 * @slot actions - Content that can be provided for the actions
 * @slot close - Content that can be provided for the close button
 * @slot - The default slot for the content
 * @public
 */
export class MessageBar extends FASTElement {
  /**
   * Sets the shape of the control.
   *
   * @public
   * @remarks
   * HTML Attribute: `shape`
   */
  @attr
  shape: MessageBarShape = 'rounded';

  /**
   * Sets the layout of the control.
   *
   * @public
   * @remarks
   * HTML Attribute: `layout`
   */
  @attr
  layout: MessageBarLayout = 'singleline';

  /**
   * Sets the intent of the control.
   *
   * @public
   * @remarks
   * HTML Attribute: `intent`
   */
  @attr
  intent: MessageBarIntent = 'info';

  /**
   * The internal {@link https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  protected elementInternals: ElementInternals = this.attachInternals();

  constructor() {
    super();
    this.elementInternals.role = 'status';
  }

  /**
   * @public
   * Method to emit a `dismiss` event when the message bar is dismissed
   */
  public dismissMessageBar = () => {
    this.$emit('dismiss', {});
  };
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
export interface MessageBar extends StartEnd {}
applyMixins(MessageBar, StartEnd);
