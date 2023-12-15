import { attr, FASTElement, observable } from '@microsoft/fast-element';
import { ARIAGlobalStatesAndProperties, StartEnd } from '../patterns/index.js';
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
   * Prompts the user to save the linked URL. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
   * @public
   * @remarks
   * HTML Attribute: download
   */
  @attr
  public download!: string;

  /**
   * The URL the hyperlink references. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
   * @public
   * @remarks
   * HTML Attribute: href
   */
  @attr
  public href!: string;

  /**
   * Hints at the language of the referenced resource. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
   * @public
   * @remarks
   * HTML Attribute: hreflang
   */
  @attr
  public hreflang!: string;

  /**
   * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
   * @public
   * @remarks
   * HTML Attribute: ping
   */
  @attr
  public ping!: string;

  /**
   * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
   * @public
   * @remarks
   * HTML Attribute: referrerpolicy
   */
  @attr
  public referrerpolicy!: string;

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
  public target!: AnchorTarget;

  /**
   * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
   * @public
   * @remarks
   * HTML Attribute: type
   */
  @attr
  public type!: string;

  /**
   *
   * Default slotted content
   *
   * @internal
   */
  @observable
  public defaultSlottedContent!: HTMLElement[];

  /**
   * References the root element
   */
  public control!: HTMLAnchorElement;

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

  /**
   * The anchor button is disabled
   *
   * @public
   * @remarks
   * HTML Attribute: disabled-focusable
   */
  @attr({ mode: 'boolean' })
  public disabled?: boolean = false;
  protected disabledChanged(prev: boolean, next: boolean): void {
    if (this.disabled) {
      ((this as unknown) as HTMLElement).setAttribute('aria-disabled', 'true');
      ((this as unknown) as HTMLElement).setAttribute('tabindex', '-1');
    } else {
      ((this as unknown) as HTMLElement).removeAttribute('aria-disabled');
      ((this as unknown) as HTMLElement).removeAttribute('tabindex');
    }
  }

  /**
   * The anchor button is disabled but focusable
   *
   * @public
   * @remarks
   * HTML Attribute: disabled-focusable
   */
  @attr({ attribute: 'disabled-focusable', mode: 'boolean' })
  public disabledFocusable?: boolean = false;
  protected disabledFocusableChanged(prev: boolean, next: boolean): void {
    if (!this.$fastController.isConnected) {
      return;
    }

    if (this.disabledFocusable) {
      ((this as unknown) as HTMLElement).setAttribute('aria-disabled', 'true');
    } else {
      ((this as unknown) as HTMLElement).removeAttribute('aria-disabled');
    }
  }

  /**
   * Prevents disabledFocusable click events
   */
  private handleDisabledFocusableClick = (e: MouseEvent): void => {
    if ((e && this.disabled) || this.disabledFocusable) {
      e.stopImmediatePropagation();
      return;
    }
  };

  public connectedCallback(): void {
    super.connectedCallback();

    ((this as unknown) as HTMLElement).addEventListener('click', this.handleDisabledFocusableClick);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();

    ((this as unknown) as HTMLElement).removeEventListener('click', this.handleDisabledFocusableClick);
  }
}

/**
 * Includes ARIA states and properties relating to the ARIA link role
 *
 * @public
 */
export class DelegatesARIALink {
  /**
   * See {@link https://www.w3.org/WAI/PF/aria/roles#link} for more information
   * @public
   * @remarks
   * HTML Attribute: aria-expanded
   */
  @attr({ attribute: 'aria-expanded' })
  public ariaExpanded!: 'true' | 'false' | string | null;
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export type DelegatesARIALink = ARIAGlobalStatesAndProperties
applyMixins(DelegatesARIALink, ARIAGlobalStatesAndProperties);

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export interface AnchorButton extends StartEnd, DelegatesARIALink {}
applyMixins(AnchorButton, StartEnd, DelegatesARIALink);
