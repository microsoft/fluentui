import { ElementViewTemplate, html, ref } from '@microsoft/fast-element';
import { staticallyCompose } from '../utils/template-helpers.js';
import type { Dropdown } from './dropdown.js';
import type { DropdownOptions } from './dropdown.options.js';

const indicator = html.partial(/* html */ `
<svg aria-hidden="true" class="chevron-down-16-regular" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M3.15 5.65a.5.5 0 0 1 .7 0L8 9.79l4.15-4.14a.5.5 0 0 1 .7.7l-4.5 4.5a.5.5 0 0 1-.7 0l-4.5-4.5a.5.5 0 0 1 0-.7"/></svg>
<svg aria-hidden="true" class="chevron-down-20-regular" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M15.85 7.65a.5.5 0 0 1 0 .7l-5.46 5.49a.55.55 0 0 1-.78 0L4.15 8.35a.5.5 0 1 1 .7-.7L10 12.8l5.15-5.16a.5.5 0 0 1 .7 0"/></svg>
<svg aria-hidden="true" class="chevron-down-24-regular" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4.22 8.47a.75.75 0 0 1 1.06 0L12 15.19l6.72-6.72a.75.75 0 1 1 1.06 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L4.22 9.53a.75.75 0 0 1 0-1.06"/></svg>
`);

/**
 * Generates a template for the {@link (Dropdown:class)} component.
 *
 * @param options - The {@link (DropdownOptions:interface)} to use for generating the template.
 * @returns The template object.
 *
 * @public
 */
export function dropdownTemplate<T extends Dropdown>(options: DropdownOptions = {}): ElementViewTemplate<T> {
  return html<T>`
    <template
      @change="${(x, c) => x.changeHandler(c.event as InputEvent)}"
      @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
      @keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
    >
      <button
        class="control"
        popovertarget="listbox"
        role="combobox"
        tabindex="${x => (x.open ? '-1' : null)}"
        ${ref('control')}
      >
        ${x => x.displayValue}
        <slot class="indicator" name="indicator">${staticallyCompose(options.indicator)}</slot>
      </button>
      <div
        class="listbox"
        id="listbox"
        popover="auto"
        role="listbox"
        @beforetoggle="${(x, c) => x.beforetoggleHandler(c.event as ToggleEvent)}"
        ${ref('listbox')}
      >
        <slot @slotchange="${(x, c) => x.slotchangeHandler(c.event as Event)}"></slot>
      </div>
    </template>
  `;
}

/**
 * Template for the Dropdown component.
 *
 * @public
 */
export const template: ElementViewTemplate<Dropdown> = dropdownTemplate({
  indicator,
});
