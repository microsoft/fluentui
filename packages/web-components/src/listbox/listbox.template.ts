import { type ElementViewTemplate, html } from '@microsoft/fast-element';
import type { Listbox } from './listbox.js';

/**
 * Generates a template for the {@link (Dropdown:class)} component.
 *
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
      <slot @slotchange="${(x, c) => x.slotchangeHandler(c.event)}"></slot>
    </template>
  `;
}

/**
 * Template for the Listbox component.
 *
 * @public
 */
export const template: ElementViewTemplate<Listbox> = listboxTemplate();
