import { ElementViewTemplate, html, ref, slotted } from '@microsoft/fast-element';
import type { Card } from './card.js';

/**
 * The template for the Fluent Card web-component.
 * @public
 */
export function cardTemplate<T extends Card>(): ElementViewTemplate<T> {
  return html<T>`
    <template size="${x => x.size}" orientation="${x => x.orientation}" appearance="${x => x.appearance}">
      <div
        role="${x => (x.selectable ? 'button' : 'group')}"
        class="card"
        part="card"
        tabindex="${x => (x.isFocusable ? '0' : null)}"
        @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
        @keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
        aria-label="${x => x.ariaLabel}"
        aria-labelledby="${x => x.ariaLabelledby}"
        aria-describedby="${x => x.ariaDescribedby}"
        aria-disabled="${x => (x.selectable ? (x.disabled ? 'true' : 'false') : null)}"
        aria-selected="${x => (x.selectable ? (x.selected ? 'true' : 'false') : null)}"
        ${ref('card')}
      >
        <div class="root" part="root" ${ref('root')}>
          <div class="control" part="control">
            <slot
              @change="${(x, c) => x.floatingActionChangeHandler(c.event as MouseEvent)}"
              name="floating-action"
              part="floating-action"
              ${slotted('floatingAction')}
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
