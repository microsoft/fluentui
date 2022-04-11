import { attr, FASTElement, observable } from '@microsoft/fast-element';
import { applyMixins, ARIAGlobalStatesAndProperties } from '@microsoft/fast-foundation';

/**
 * Types of button appearance.
 * @public
 */
export type LinkAppearance = undefined | 'subtle';

/**
 * @internal
 */
export class Link extends FASTElement {
  /**
   * Prompts the user to save the linked URL.
   * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
   * @public
   * @remarks
   * HTML Attribute: download
   */
  @attr
  public download: string;

  /**
   * The URL the hyperlink references.
   * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
   * @public
   * @remarks
   * HTML Attribute: href
   */
  @attr
  public href: string;

  /**
   * Hints at the language of the referenced resource.
   * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
   * @public
   * @remarks
   * HTML Attribute: hreflang
   */
  @attr
  public hreflang: string;

  /**
   * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
   * @public
   * @remarks
   * HTML Attribute: ping
   */
  @attr
  public ping: string;

  /**
   * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
   * @public
   * @remarks
   * HTML Attribute: referrerpolicy
   */
  @attr
  public referrerpolicy: string;

  /**
   * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
   * @public
   * @remarks
   * HTML Attribute: rel
   */
  @attr
  public rel: string;

  /**
   * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
   * @public
   * @remarks
   * HTML Attribute: target
   */
  @attr
  public target: '_self' | '_blank' | '_parent' | '_top';

  /**
   * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
   * @public
   * @remarks
   * HTML Attribute: type
   */
  @attr
  public type: string;

  /**
   * See {@link https://www.w3.org/WAI/PF/aria/roles#link} for more information
   * @public
   * @remarks
   * HTML Attribute: aria-expanded
   */
  @attr({ attribute: 'aria-expanded', mode: 'fromView' })
  public ariaExpanded: 'true' | 'false' | undefined;

  /**
   *
   * Default slotted content
   *
   * @internal
   */
  @observable
  public defaultSlottedContent: HTMLElement[];

  /**
   * References the root element
   */
  public control: HTMLAnchorElement;

  /**
   * @internal
   */
  public connectedCallback(): void {
    super.connectedCallback();

    this.handleUnsupportedDelegatesFocus();
  }

  /**
   * Overrides the focus call for where delegatesFocus is unsupported.
   * This check works for Chrome, Edge Chromium, FireFox, and Safari
   * Relevant PR on the Firefox browser: https://phabricator.services.mozilla.com/D123858
   */
  private handleUnsupportedDelegatesFocus = () => {
    // Check to see if delegatesFocus is supported
    if (
      window.ShadowRoot &&
      !window.ShadowRoot.prototype.hasOwnProperty('delegatesFocus') &&
      this.$fastController.definition.shadowOptions?.delegatesFocus
    ) {
      this.focus = () => {
        this.control.focus();
      };
    }
  };
  /**
   * The appearance the button should have.
   *
   * @public
   * @remarks
   * HTML Attribute: appearance
   */
  @attr
  public appearance: LinkAppearance;

  /**
   * The link renders inline with text.
   *
   * @public
   * @remarks
   * HTML Attribute: inline
   */
  @attr({ mode: 'boolean' })
  public inline: boolean = false;

  /**
   * The link is disabled
   *
   * @public
   * @remarks
   * HTML Attribute: disabled
   */
  @attr({ mode: 'boolean' })
  public disabled: boolean = false;

  /**
   * The appearance the button should have.
   *
   * @public
   * @remarks
   * HTML Attribute: block
   */
  @attr({ attribute: 'disabledfocusable', mode: 'boolean' })
  public disabledFocusable: boolean = false;

  public handleDisabledClick(e: MouseEvent): void | boolean {
    if (this.disabled || this.disabledFocusable) {
      e.preventDefault();
    } else {
      return true;
    }
  }

  public handleDisabledKeydown(e: KeyboardEvent): void | boolean {
    if ((this.disabled || this.disabledFocusable) && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      return true;
    }
  }
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export interface Link extends ARIAGlobalStatesAndProperties {}
applyMixins(Link, ARIAGlobalStatesAndProperties);
