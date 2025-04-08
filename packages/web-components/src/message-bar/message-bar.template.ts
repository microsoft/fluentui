import { type ElementViewTemplate, html } from '@microsoft/fast-element';
import type { MessageBar } from './message-bar.js';

/**
 * Generates a template for the MessageBar component.
 * @public
 * @param {MessageBar} T - The type of the MessageBar.
 * @returns {ElementViewTemplate<T>} - The template for the MessageBar component.
 */
export function messageBarTemplate<T extends MessageBar>(): ElementViewTemplate<T> {
  return html<T>`
    <slot name="icon"></slot>
    <div class="content">
      <slot></slot>
    </div>
    <div class="actions">
      <slot name="actions"></slot>
    </div>
    <slot name="dismiss"></slot>
  `;
}

/**
 * The template for the MessageBar component.
 * @type {ElementViewTemplate<MessageBar>}
 */
export const template: ElementViewTemplate<MessageBar> = messageBarTemplate();
