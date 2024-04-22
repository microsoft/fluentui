import { ElementViewTemplate, html, slotted } from '@microsoft/fast-element';
import { endSlotTemplate, startSlotTemplate } from '../patterns/index.js';
import type { CompoundButton } from './compound-button.js';
import type { CompoundButtonOptions } from './compound-button.options.js';

/**
 * The template for the Compound Button component.
 * @public
 */
export function buttonTemplate<T extends CompoundButton>(options: CompoundButtonOptions = {}): ElementViewTemplate<T> {
  return html<T>`
    <template ?disabled="${x => x.disabled}" tabindex="${x => (x.disabled ? -1 : 0)}">
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
 * @public
 */
export const template: ElementViewTemplate<CompoundButton> = buttonTemplate();
