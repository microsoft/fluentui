import { attr, css, ElementStyles, FASTElement } from '@microsoft/fast-element';
import { StartEnd, StartEndOptions } from '../patterns/index.js';
import { applyMixins } from '../utils/apply-mixins.js';

/**
 * Tab configuration options
 * @public
 */
export type TabOptions = StartEndOptions<Tab>;

/**
 * Tab extends the FASTTab and is a child of the TabList
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

  private styles: ElementStyles | undefined;

  connectedCallback() {
    super.connectedCallback();

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
