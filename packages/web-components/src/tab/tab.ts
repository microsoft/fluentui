import { attr, css, ElementStyles, FASTElement } from '@microsoft/fast-element';
import { StartEnd, StartEndOptions } from '../patterns/index.js';
import { applyMixins } from '../utils/apply-mixins.js';

/**
 * Tab configuration options
 * @public
 */
export type TabOptions = StartEndOptions<Tab>;

/**
 * A Tab component that provides a selectable tab in a tab list.
 * @class Tab
 * @extends FASTElement
 *
 * @remarks
 * Designed to be used with {@link @fluentui/web-components#tabTemplate}.
 *
 * @attr disabled - When true, the control will be immutable by user interaction.
 *
 * @csspart start - The start slot of the tab.
 * @csspart tab-content - The content of the tab.
 * @csspart end - The end slot of the tab.
 *
 * @cssproperty --textContent - The content of the tab.
 *
 * @slot - The default slot for the tab content.
 *
 * @summary The Tab component provides a selectable tab in a tab list.
 *
 * @tag fluent-tab
 *
 * @public
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
