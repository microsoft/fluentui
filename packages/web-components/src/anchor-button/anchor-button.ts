import { attr, FASTElement, Observable } from '@microsoft/fast-element';
import { keyEnter } from '@microsoft/fast-web-utilities';
import { StartEnd } from '../patterns/index.js';
import type { StartEndOptions } from '../patterns/index.js';
import { applyMixins } from '../utils/apply-mixins.js';
import {
  AnchorAttributes,
  type AnchorButtonAppearance,
  type AnchorButtonShape,
  type AnchorButtonSize,
  type AnchorTarget,
} from './anchor-button.options.js';

/**
 * Anchor configuration options
 * @public
 */
export type AnchorOptions = StartEndOptions<AnchorButton>;

/**
 * An AnchorButton component that functions as a hyperlink with button appearance and behavior.
 * @extends FASTElement
 *
 * @attr download - Prompts the user to save the linked URL.
 * @attr href - The URL the hyperlink references.
 * @attr hreflang - Hints at the language of the referenced resource.
 * @attr ping - A space-separated list of URLs to ping.
 * @attr referrerpolicy - Specifies which referrer information to send with the link.
 * @attr rel - Specifies the relationship of the target object to the link object.
 * @attr target - Specifies where to display the linked URL.
 * @attr type - Specifies the media type of the linked URL.
 * @attr appearance - The appearance the anchor button should have.
 * @attr shape - The shape the anchor button should have.
 * @attr size - The size the anchor button should have.
 * @attr icon-only - The anchor button has an icon only, no text content.
 * @attr disabled - The anchor button is disabled.
 * @attr disabled-focusable - The anchor button is disabled but focusable.
 *
 * @csspart control - The root anchor element.
 * @csspart content - The content of the button.
 *
 * @cssproperty --icon-spacing - The spacing between the icon and the text.
 *
 * @slot - Default slot for the anchor button's content.
 *
 * @fires click - Prevents disabledFocusable click events.
 *
 * @summary The AnchorButton component functions as a hyperlink with button appearance and behavior.
 *
 * @tag fluent-anchor-button
 *
 * @public
 */
export class AnchorButton extends FASTElement {
  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  protected elementInternals: ElementInternals = this.attachInternals();

  /**
   * The proxy anchor element
   * @internal
   */
  private internalProxyAnchor: HTMLAnchorElement = this.createProxyElement();

  /**
   * Prompts the user to save the linked URL.
   *
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Element/a#download | `download`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `download`
   */
  @attr
  public download?: string;

  /**
   * The URL the hyperlink references.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Element/a#href | `href`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `href`
   */
  @attr
  public href?: string;

  /**
   * Hints at the language of the referenced resource.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Element/a#hreflang | `hreflang`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `hreflang`
   */
  @attr
  public hreflang?: string;

  /**
   * The ping attribute.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Element/a#ping | `ping`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `ping`
   */
  @attr
  public ping?: string;

  /**
   * The referrerpolicy attribute.
   * See The {@link https://developer.mozilla.org/docs/Web/HTML/Element/a#referrerpolicy | `referrerpolicy`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `referrerpolicy`
   */
  @attr
  public referrerpolicy?: string;

  /**
   * The rel attribute.
   * See The {@link https://developer.mozilla.org/docs/Web/HTML/Element/a#rel | `rel`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `rel`
   */
  @attr
  public rel!: string;

  /**
   * The target attribute.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Element/a#target | `target`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `target`
   */
  @attr
  public target?: AnchorTarget;

  /**
   * The type attribute.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Element/a#type | `type`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `type`
   */
  @attr
  public type?: string;

  /**
   * The appearance the anchor button should have.
   *
   * @public
   * @remarks
   * HTML Attribute: `appearance`
   */
  @attr
  public appearance?: AnchorButtonAppearance | undefined;

  /**
   * The shape the anchor button should have.
   *
   * @public
   * @remarks
   * HTML Attribute: `shape`
   */
  @attr
  public shape?: AnchorButtonShape | undefined;

  /**
   * The size the anchor button should have.
   *
   * @public
   * @remarks
   * HTML Attribute: `size`
   */
  @attr
  public size?: AnchorButtonSize;

  /**
   * The anchor button has an icon only, no text content
   *
   * @public
   * @remarks
   * HTML Attribute: `icon-only`
   */
  @attr({ attribute: 'icon-only', mode: 'boolean' })
  public iconOnly: boolean = false;

  constructor() {
    super();

    this.elementInternals.role = 'link';
  }

  public connectedCallback() {
    super.connectedCallback();
    Observable.getNotifier(this).subscribe(this);

    Object.keys(this.$fastController.definition.attributeLookup).forEach(key => {
      this.handleChange(this, key);
    });

    this.append(this.internalProxyAnchor);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();

    Observable.getNotifier(this).unsubscribe(this);
  }

  /**
   * Handles changes to observable properties
   * @internal
   * @param source
   * @param propertyName
   */
  public handleChange(source: any, propertyName: string) {
    if (propertyName in AnchorAttributes) {
      const attribute = this.$fastController.definition.attributeLookup[propertyName]?.attribute;
      if (attribute) {
        this.handleProxyAttributeChange(attribute, this[propertyName as AnchorAttributes]);
      }
    }
  }

  /**
   * Handles the anchor click event.
   *
   * @param e - The event object
   * @internal
   */
  public clickHandler(): boolean {
    this.internalProxyAnchor.click();

    return true;
  }

  /**
   * Handles keypress events for the anchor.
   *
   * @param e - the keyboard event
   * @returns - the return value of the click handler
   * @public
   */
  public keypressHandler(e: KeyboardEvent): boolean | void {
    if (e.key === keyEnter) {
      this.internalProxyAnchor.click();
      return;
    }

    return true;
  }

  /**
   * A method for updating proxy attributes when attributes have changed
   * @internal
   * @param attribute
   * @param value
   */
  private handleProxyAttributeChange(attribute: string, value: string | undefined): void {
    if (value) {
      this.internalProxyAnchor.setAttribute(attribute, value);
    } else {
      this.internalProxyAnchor.removeAttribute(attribute);
    }
  }

  private createProxyElement(): HTMLAnchorElement {
    const proxy = this.internalProxyAnchor ?? document.createElement('a');
    proxy.hidden = true;
    return proxy;
  }
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
export interface AnchorButton extends StartEnd {}
applyMixins(AnchorButton, StartEnd);
