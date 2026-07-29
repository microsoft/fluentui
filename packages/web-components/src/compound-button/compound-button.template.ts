import { type ElementViewTemplate, html, slotted } from '@microsoft/fast-element';
import { endSlotTemplate, startSlotTemplate } from '../patterns/start-end.js';
import type { CompoundButton } from './compound-button.js';
import type { CompoundButtonOptions } from './compound-button.options.js';

/**
 * Generates a template for the Button component.
 *
 * @public
 */
export function buttonTemplate<T extends CompoundButton>(options: CompoundButtonOptions = {}): ElementViewTemplate<T> {
  return html<T>`
    <template
      @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
      @keypress="${(x, c) => x.keypressHandler(c.event as KeyboardEvent)}"
    >
      ${startSlotTemplate(options)}
      <span class="content" part="content">
        <slot ${slotted('defaultSlottedContent')}></slot>
        <slot name="description"></slot>
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
export const template: ElementViewTemplate<CompoundButton> = buttonTemplate();
