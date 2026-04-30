import { type ElementViewTemplate, html, slotted } from '@microsoft/fast-element';
import { endSlotTemplate, startSlotTemplate } from '../patterns/index.js';
import type { BaseButton } from './button.base.js';
import type { ButtonOptions } from './button.options.js';

/**
 * Generates a template for the Button component.
 *
 * @public
 */
export function buttonTemplate<T extends BaseButton>(options: ButtonOptions = {}): ElementViewTemplate<T> {
  return html<T>`
    <template
      @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
      @keypress="${(x, c) => x.keypressHandler(c.event as KeyboardEvent)}"
    >
      ${startSlotTemplate(options)}
      <span class="content" part="content">
        <slot ${slotted('defaultSlottedContent')}></slot>
      </span>
      ${endSlotTemplate(options)}
    </template>
  `;
}

/**
 * The template for the Button component.
 *
 * @public
 */
export const template: ElementViewTemplate<BaseButton> = buttonTemplate();
