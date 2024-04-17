import { ElementViewTemplate, html, slotted } from '@microsoft/fast-element';
import { endSlotTemplate, startSlotTemplate } from '../patterns/index.js';
import type { Button } from './button.js';
import { ButtonOptions } from './button.options.js';

/**
 * The template for the Button component.
 * @public
 */
export function buttonTemplate<T extends Button>(options: ButtonOptions = {}): ElementViewTemplate<T> {
  return html<T>`
    <template
      tabindex="${x => (x.disabled ? -1 : 0)}"
      @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
      @keyup="${(x, c) => x.keyupHandler(c.event as KeyboardEvent)}"
    >
      ${startSlotTemplate(options)}
      <span class="content" part="content">
        <slot ${slotted('defaultSlottedContent')}></slot>
      </span>
      ${endSlotTemplate(options)}
    </template>
  `;
}

export const template: ElementViewTemplate<Button> = buttonTemplate();
