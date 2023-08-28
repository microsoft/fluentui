import { ElementViewTemplate, html, when } from '@microsoft/fast-element';
import type { Card } from './card.js';

/**
 * The template for the Fluent Card web-component.
 * @public
 */
export function cardTemplate<T extends Card>(): ElementViewTemplate<T> {
  return html<T>`
    <template
      role="group"
      ?interactive="${x => x.interactive}"
      ?selected="${x => x.selected}"
      ?disabled="${x => x.disabled}"
      orientation="${x => x.orientation}"
      appearance="${x => x.appearance}"
      control-size="${x => x.controlSize}"
      aria-selected="${x => x.selected}"
      aria-disabled="${x => x.disabled}"
      @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
      @keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
    >
      <slot name="header"></slot>
      <slot></slot>
      <slot name="footer"></slot>
    </template>
  `;
}

export const template: ElementViewTemplate<Card> = cardTemplate();
