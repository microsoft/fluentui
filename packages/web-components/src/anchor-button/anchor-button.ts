import { attr, FASTElement, Observable } from '@microsoft/fast-element';
import { keyEnter } from '@microsoft/fast-web-utilities';
import { StartEnd } from '../patterns/index.js';
import type { StartEndOptions } from '../patterns/index.js';
import { applyMixins } from '../utils/apply-mixins.js';
import { toggleState } from '../utils/element-internals.js';
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
export class BaseAnchor extends FASTElement {
  /**
   * Holds a reference to the platform to manage ctrl+click on Windows and cmd+click on Mac
   * @internal
   */
  private readonly isMac = navigator.userAgent.includes('Mac');

  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

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
   * @param source - the source of the change
   * @param propertyName - the property name being changed
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
  public clickHandler(e: PointerEvent): boolean {
    if (this.href) {
      const newTab = !this.isMac ? e.ctrlKey : e.metaKey;
      this.handleNavigation(newTab);
    }

    return true;
  }

  /**
   * Handles keydown events for the anchor.
   *
   * @param e - the keyboard event
   * @returns - the return value of the click handler
   * @public
   */
  public keydownHandler(e: KeyboardEvent): boolean | void {
    if (this.href) {
      if (e.key === keyEnter) {
        const newTab = !this.isMac ? e.ctrlKey : e.metaKey || e.ctrlKey;
        this.handleNavigation(newTab);
        return;
      }
    }

    return true;
  }

  /**
   * Handles navigation based on input
   * If the metaKey is pressed, opens the href in a new window, if false, uses the click on the proxy
   * @internal
   */
  private handleNavigation(newTab: boolean): void {
    newTab ? window.open(this.href, '_blank') : this.internalProxyAnchor.click();
  }

  /**
   * A method for updating proxy attributes when attributes have changed
   * @internal
   * @param attribute - an attribute to set/remove
   * @param value - the value of the attribute
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
    proxy.ariaHidden = 'true';
    proxy.tabIndex = -1;
    return proxy;
  }
}

export class AnchorButton extends BaseAnchor {
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
   * Handles changes to appearance attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public appearanceChanged(prev: AnchorButtonAppearance | undefined, next: AnchorButtonAppearance | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

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
   * Handles changes to shape attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public shapeChanged(prev: AnchorButtonShape | undefined, next: AnchorButtonShape | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

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
   * Handles changes to size attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public sizeChanged(prev: AnchorButtonSize | undefined, next: AnchorButtonSize | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

  /**
   * The anchor button has an icon only, no text content
   *
   * @public
   * @remarks
   * HTML Attribute: `icon-only`
   */
  @attr({ attribute: 'icon-only', mode: 'boolean' })
  public iconOnly: boolean = false;

  /**
   * Handles changes to icon only custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public iconOnlyChanged(prev: boolean, next: boolean) {
    toggleState(this.elementInternals, 'icon', !!next);
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
