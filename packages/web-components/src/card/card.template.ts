import { ElementViewTemplate, html, ref, slotted, when } from '@microsoft/fast-element';
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
      size="${x => x.size}"
      tabindex="${x => (!x.disabled && x.interactive ? 0 : null)}"
      @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
      @keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
      aria-labelledby="${x => x.ariaLabelledby}"
      aria-describedby="${x => x.ariaLabelledby}"
      aria-label="${x => x.ariaLabel}"
    >
      <div class="control" part="control">
        <slot name="floating-action" part="floating-action" ${slotted('floatingActionSlot')}></slot>
        ${when(
          x => x.selectable && !x.floatingActionSlot.length,
          html<T>`
            <fluent-checkbox ${ref('internalCheckbox')} ?checked="${x => x.selected}" hidden></fluent-checkbox>
          `,
        )}
      </div>
      <div class="content">
        <slot></slot>
      </div>
    </template>
  `;
}

export const template: ElementViewTemplate<Card> = cardTemplate();
