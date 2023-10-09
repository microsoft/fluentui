import { ElementViewTemplate, html, ref, slotted } from '@microsoft/fast-element';
import type { Card } from './card.js';

/**
 * The template for the Fluent Card web-component.
 * @public
 */
export function cardTemplate<T extends Card>(): ElementViewTemplate<T> {
  return html<T>`
    <template
      ?disabled="${x => x.disabled}"
      ?selected="${x => x.selected}"
      ?selectable="${x => x.selectable}"
      focus-mode="${x => x.focusMode}"
      orientation="${x => x.orientation}"
      appearance="${x => x.appearance}"
      size="${x => x.size}"
    >
      <div
        role="group"
        class="card"
        part="card"
        tabindex="${x => (x.isFocusable ? '0' : null)}"
        @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
        @keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
        aria-label="${x => x.ariaLabel}"
        aria-labelledby="${x => x.ariaLabelledby}"
        aria-describedby="${x => x.ariaDescribedby}"
        aria-disabled="${x => x.disabled}"
        aria-selected="${x => x.selected}"
        ${ref('card')}
      >
        <div class="root" part="root" ${ref('root')}>
          <div class="control" part="control">
            <slot name="floating-action" part="floating-action" ${slotted('floatingActionSlot')}></slot>
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
