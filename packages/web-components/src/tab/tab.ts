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
  public disabled = false;
  protected disabledChanged(prev: boolean, next: boolean) {
    if (!this.$fastController.isConnected) {
      return;
    }

    if (next) {
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.removeAttribute('aria-disabled');
    }
    this.tabIndex = next ? -1 : 0;
  }

  private styles: ElementStyles | undefined;

  connectedCallback() {
    super.connectedCallback();

    this.disabledChanged(false, this.disabled);

    if (this.styles !== undefined) {
      this.$fastController.removeStyles(this.styles);
    }

    this.styles = css/**css*/ `
      :host {
        --textContent: '${this.textContent as any}';
      }
    `;

    this.$fastController.addStyles(this.styles);
  }
}

/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
export interface Tab extends StartEnd {}
applyMixins(Tab, StartEnd);
