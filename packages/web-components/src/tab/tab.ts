import { attr, css, type ElementStyles, FASTElement } from '@microsoft/fast-element';
import type { StartEndOptions } from '../patterns/start-end.js';
import { StartEnd } from '../patterns/start-end.js';
import { applyMixins } from '../utils/apply-mixins.js';

/**
 * Tab configuration options
 * @public
 */
export type TabOptions = StartEndOptions<Tab>;

/**
 * Tab extends the FASTTab and is a child of the TabList
 *
 * @tag fluent-tab
 */
export class Tab extends FASTElement {
  /**
   * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled | disabled HTML attribute} for more information.
   * @public
   * @remarks
   * HTML Attribute: disabled
   */
  @attr({ mode: 'boolean' })
  public disabled!: boolean;
  protected disabledChanged(prev: boolean, next: boolean) {
    if (!this.$fastController.isConnected) {
      return;
    }

    this.setDisabledSideEffect(next);
  }

  /**
   * Internal text content stylesheet, used to set the content of the `::after`
   * pseudo element to prevent layout shift when the font weight changes on selection.
   * @internal
   */
  private styles?: ElementStyles;

  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  constructor() {
    super();

    this.elementInternals.role = 'tab';
  }

  connectedCallback() {
    super.connectedCallback();

    this.slot ||= 'tab';

    this.setDisabledSideEffect(this.disabled);

    if (this.styles) {
      this.$fastController.removeStyles(this.styles);
    }

    this.styles = css`
      :host {
        --textContent: '${this.textContent as string}';
      }
    `;

    this.$fastController.addStyles(this.styles);
  }

  private setDisabledSideEffect(disabled: boolean) {
    if (disabled) {
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.removeAttribute('aria-disabled');
    }
    this.tabIndex = disabled ? -1 : 0;
  }
}

/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
export interface Tab extends StartEnd {}
applyMixins(Tab, StartEnd);
