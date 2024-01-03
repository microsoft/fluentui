import { ElementViewTemplate, html, ref } from '@microsoft/fast-element';
import type { Card } from './card.js';

/**
 * The template for the Fluent Card web-component.
 * @public
 */
export function cardTemplate<T extends Card>(): ElementViewTemplate<T> {
  return html<T>`
    <template size="${x => x.size}" appearance="${x => x.appearance}">
      <div class="card" part="card">
        <slot></slot>
      </div>
    </template>
  `;
}

export const template: ElementViewTemplate<Card> = cardTemplate();
