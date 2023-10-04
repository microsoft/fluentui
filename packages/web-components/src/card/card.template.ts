import { ElementViewTemplate, html, ref, slotted, when } from '@microsoft/fast-element';
import type { Card } from './card.js';

/**
 * The template for the Fluent Card web-component.
 * @public
 */
export function cardTemplate<T extends Card>(): ElementViewTemplate<T> {
  return html<T>`
    <template
      ?interactive="${x => x.interactive}"
      ?selected="${x => x.selected}"
      ?disabled="${x => x.disabled}"
      ?selectable="${x => x.selectable}"
      focus-mode="${x => x.focusMode}"
      orientation="${x => x.orientation}"
      appearance="${x => x.appearance}"
      size="${x => x.size}"
    >
      <div
        role="${x => (x.interactive && !x.selectable ? 'button' : 'group')}"
        class="card"
        part="card"
        tabindex="${x => x.tabIndex}"
        @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
        @keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
        ${ref('card')}
      >
        <div class="root" part="root" ${ref('root')}>
          <div class="control" part="control">
            <slot
              tabindex="${x => (x.interactive ? -1 : 0)}"
              name="floating-action"
              part="floating-action"
              ${slotted('floatingActionSlot')}
            ></slot>
          </div>
          <div class="content">
            <slot></slot>
          </div>
        </div>
      </div>
    </template>
  `;
}

export const template: ElementViewTemplate<Card> = cardTemplate();
