import { ElementViewTemplate, html } from '@microsoft/fast-element';
import type { MessageBar } from './message-bar.js';

/**
 * Generates a template for the MessageBar component.
 * @public
 * @param {MessageBar} T - The type of the MessageBar.
 * @returns {ElementViewTemplate<T>} - The template for the MessageBar component.
 */
export function messageBarTemplate<T extends MessageBar>(): ElementViewTemplate<T> {
  return html<T>`
    <template>
      <slot name="icon"></slot>
      <div class="content">
        <slot></slot>
      </div>
      <slot name="actions"></slot>
      <slot name="close"></slot>
    </template>
  `;
}

/**
 * The template for the MessageBar component.
 * @type {ElementViewTemplate<MessageBar>}
 */
export const template: ElementViewTemplate<MessageBar> = messageBarTemplate();
