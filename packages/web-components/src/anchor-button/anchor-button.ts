import { attr, FASTElement } from '@microsoft/fast-element';
import { keyEnter } from '@microsoft/fast-web-utilities';
import { StartEnd } from '../patterns/index.js';
import type { StartEndOptions } from '../patterns/index.js';
import { applyMixins } from '../utils/apply-mixins.js';
import type {
  AnchorButtonAppearance,
  AnchorButtonShape,
  AnchorButtonSize,
  AnchorTarget,
} from './anchor-button.options.js';

/**
 * Anchor configuration options
 * @public
 */
export type AnchorOptions = StartEndOptions<AnchorButton>;

/**
 * An Anchor Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element }.
 *
 * @slot start - Content which can be provided before the anchor content
 * @slot end - Content which can be provided after the anchor content
 * @slot - The default slot for anchor content
 * @csspart control - The anchor element
 * @csspart content - The element wrapping anchor content
 *
 * @public
 */
export class AnchorButton extends FASTElement {
  /**
   * The internal {@link https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  protected elementInternals: ElementInternals = this.attachInternals();

  /**
   * The proxy anchor element
   * @internal
   */
  private proxy!: HTMLAnchorElement;

  /**
   * Prompts the user to save the linked URL. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
   * @public
   * @remarks
   * HTML Attribute: download
   */
  @attr
  public download?: string;

  /**
   * The URL the hyperlink references. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
   * @public
   * @remarks
   * HTML Attribute: href
   */
  @attr
  public href?: string;

  /**
   * Hints at the language of the referenced resource. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
   * @public
   * @remarks
   * HTML Attribute: hreflang
   */
  @attr
  public hreflang?: string;

  /**
   * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
   * @public
   * @remarks
   * HTML Attribute: ping
   */
  @attr
  public ping?: string;

  /**
   * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
   * @public
   * @remarks
   * HTML Attribute: referrerpolicy
   */
  @attr
  public referrerpolicy?: string;

  /**
   * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
   * @public
   * @remarks
   * HTML Attribute: rel
   */
  @attr
  public rel!: string;

  /**
   * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
   * @public
   * @remarks
   * HTML Attribute: target
   */
  @attr
  public target?: AnchorTarget;

  /**
   * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
   * @public
   * @remarks
   * HTML Attribute: type
   */
  @attr
  public type?: string;

  /**
   * The appearance the anchor button should have.
   *
   * @public
   * @remarks
   * HTML Attribute: appearance
   */
  @attr
  public appearance?: AnchorButtonAppearance | undefined;

  /**
   * The shape the anchor button should have.
   *
   * @public
   * @remarks
   * HTML Attribute: shape
   */
  @attr
  public shape?: AnchorButtonShape | undefined;

  /**
   * The size the anchor button should have.
   *
   * @public
   * @remarks
   * HTML Attribute: size
   */
  @attr
  public size?: AnchorButtonSize;

  /**
   * The anchor button has an icon only, no text content
   *
   * @public
   * @remarks
   * HTML Attribute: icon-only
   */
  @attr({ attribute: 'icon-only', mode: 'boolean' })
  public iconOnly: boolean = false;

  constructor() {
    super();

    this.elementInternals.role = 'link';
  }

  public connectedCallback(): void {
    super.connectedCallback();

    this.createProxyElement();
  }

  /**
   * Handles the anchor click event.
   *
   * @param e - The event object
   * @internal
   */
  public clickHandler(): boolean {
    this.proxy.click();

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
      this.proxy.click();
      return;
    }

    return true;
  }

  /**
   * Synchronizes the element's download attribute with the internal proxy state.
   * @internal
   * @param prev
   * @param next
   */
  private downloadChanged(prev: string | undefined, next: string | undefined): void {
    if (next) {
      this.proxy.setAttribute('download', `${next}`);
    } else {
      this.proxy.removeAttribute('download');
    }
  }

  /**
   * Synchronizes the element's href attribute with the internal proxy state.
   * @internal
   * @param prev
   * @param next
   */
  private hrefChanged(prev: string | undefined, next: string | undefined): void {
    if (next) {
      this.proxy.setAttribute('href', `${next}`);
    } else {
      this.proxy.removeAttribute('href');
    }
  }

  /**
   * Synchronizes the element's href attribute with the internal proxy state.
   * @internal
   * @param prev
   * @param next
   */
  private hreflangChanged(prev: string | undefined, next: string | undefined): void {
    if (next) {
      this.proxy.setAttribute('hreflang', `${next}`);
    } else {
      this.proxy.removeAttribute('hreflang');
    }
  }

  /**
   * Synchronizes the element's ping attribute with the internal proxy state.
   * @internal
   * @param prev
   * @param next
   */
  private pingChanged(prev: string | undefined, next: string | undefined): void {
    if (next) {
      this.proxy.setAttribute('ping', `${next}`);
    } else {
      this.proxy.removeAttribute('ping');
    }
  }

  /**
   * Synchronizes the element's referrerpolicy with the internal proxy state.
   * @internal
   * @param prev
   * @param next
   */
  private referrerpolicyChanged(prev: string | undefined, next: string | undefined): void {
    if (next) {
      this.proxy.setAttribute('referrerpolicy', `${next}`);
    } else {
      this.proxy.removeAttribute('referrerpolicy');
    }
  }

  /**
   * Synchronizes the element's rel with the internal proxy state.
   * @internal
   * @param prev
   * @param next
   */
  private relChanged(prev: string | undefined, next: string | undefined): void {
    if (next) {
      this.proxy.setAttribute('rel', `${next}`);
    } else {
      this.proxy.removeAttribute('rel');
    }
  }

  /**
   * Synchronizes the element's target with the internal proxy state.
   * @internal
   * @param prev
   * @param next
   */
  private targetChanged(prev: string | undefined, next: string | undefined): void {
    if (next) {
      this.proxy.setAttribute('target', `${next}`);
    } else {
      this.proxy.removeAttribute('target');
    }
  }

  /**
   * Synchronizes the element's type with the internal proxy state.
   * @internal
   * @param prev
   * @param next
   */
  private typeChanged(prev: string | undefined, next: string | undefined): void {
    if (next) {
      this.proxy.setAttribute('type', `${next}`);
    } else {
      this.proxy.removeAttribute('type');
    }
  }

  private createProxyElement(): void {
    const proxy = document.createElement('a');

    if (this.download) {
      proxy.setAttribute('download', this.download);
    }

    if (this.href) {
      proxy.setAttribute('href', this.href);
    }

    if (this.hreflang) {
      proxy.setAttribute('hreflang', this.hreflang);
    }

    if (this.ping) {
      proxy.setAttribute('ping', this.ping);
    }

    if (this.referrerpolicy) {
      proxy.setAttribute('referrerpolicy', this.referrerpolicy);
    }

    if (this.rel) {
      proxy.setAttribute('rel', this.rel);
    }

    if (this.target) {
      proxy.setAttribute('target', this.target);
    }

    if (this.type) {
      proxy.setAttribute('type', this.type);
    }

    proxy.hidden = true;

    this.append(proxy);

    this.proxy = proxy;
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
