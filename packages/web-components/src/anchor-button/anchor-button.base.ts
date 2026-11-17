import { attr, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { toggleState } from '../utils/element-internals.js';
import { type AnchorTarget } from './anchor-button.options.js';

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
   * A reference to the internal anchor element.
   *
   * @internal
   */
  @observable
  public control!: HTMLAnchorElement & {
    ariaLabelledByElements?: HTMLElement[] | null;
    ariaDescribedByElements?: HTMLElement[] | null;
  };

  /**
   * Updates the focus visible state when the control changes.
   *
   * @param prev - previous control
   * @param next - new control
   * @internal
   */
  protected controlChanged(prev: HTMLAnchorElement | undefined, next: HTMLAnchorElement | undefined) {
    if (next) {
      this.updateFocusVisibleState();
    }
  }

  /**
   * The mutation observer for attribute changes.
   * @internal
   */
  private attributeObserver?: MutationObserver;

  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

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
   * Forwards programmatic activation to the native anchor when available.
   * @public
   */
  public override click(): void {
    if (this.control) {
      this.control.click();
      return;
    }

    super.click();
  }

  constructor() {
    super();

    this.attributeObserver ??= new MutationObserver(records => {
      records.forEach(({ attributeName }) => {
        if (attributeName) {
          this.handleAttributeChange(attributeName);
        }
      });
    });
    this.attributeObserver.observe(this, { attributes: true });

    Updates.enqueue(() => {
      for (const attribute of this.getAttributeNames()) {
        this.handleAttributeChange(attribute);
      }
    });
  }

  /**
   * Mirrors the native anchor's visible focus on the host.
   * @internal
   */
  public focusHandler(e: Event): boolean {
    this.updateFocusVisibleState(e.type !== 'focusout' && e.type !== 'pointerdown');
    return true;
  }

  /**
   * Forwards anchor and ARIA attributes to the native anchor.
   * @param attribute - an attribute to set/remove
   * @internal
   */
  protected handleAttributeChange(attribute: string): void {
    if (!attribute.startsWith('aria-')) {
      return;
    }

    const value = this.getAttribute(attribute);
    if (value === null) {
      this.control.removeAttribute(attribute);
    } else {
      this.control.setAttribute(attribute, value);
    }

    // Convert ARIA ID lists to element references
    if (attribute === 'aria-labelledby' || attribute === 'aria-describedby') {
      const root = this.getRootNode();
      const elements =
        value
          ?.trim()
          .split(/\s+/)
          .map(id => (root instanceof ShadowRoot ? root.getElementById(id) : this.ownerDocument.getElementById(id)))
          .filter((element): element is HTMLElement => element !== null) ?? null;

      if (attribute === 'aria-labelledby') {
        this.control.ariaLabelledByElements = elements;
      } else {
        this.control.ariaDescribedByElements = elements;
      }
    }
  }

  /**
   * Updates the custom `focus-visible` state.
   *
   * @param showFocus - whether to show focus-visible state
   * @internal
   * @internalRemarks
   * A state is used instead of `:focus-visible` itself because the host can't otherwise be conditionally styled based
   * on the internal anchor's `:focus-visible` state. See https://github.com/w3c/csswg-drafts/issues/3080
   */
  protected updateFocusVisibleState(showFocus = true): void {
    toggleState(this.elementInternals, 'focus-visible', showFocus && this.control.matches(':focus-visible'));
  }
}
