import { ElementViewTemplate, html, slotted } from '@microsoft/fast-element';
import { isDropdownOption } from '../option/option.options.js';
import type { Listbox } from './listbox.js';

/**
 * Generates a template for the {@link (Dropdown:class)} component.
 *
 * @param options - The {@link (DropdownOptions:interface)} to use for generating the template.
 * @returns The template object.
 *
 * @public
 */
export function listboxTemplate<T extends Listbox>(): ElementViewTemplate<T> {
  return html<T>`
    <template
      id="${x => x.id}"
      @beforetoggle="${(x, c) => x.beforetoggleHandler(c.event as ToggleEvent)}"
      @click="${(x, c) => x.clickHandler(c.event as PointerEvent)}"
    >
      <slot
        ${slotted({
          property: 'options',
          filter: node => isDropdownOption(node),
        })}
      ></slot>
    </template>
  `;
}

/**
 * Template for the Listbox component.
 *
 * @public
 */
export const template: ElementViewTemplate<Listbox> = listboxTemplate();
