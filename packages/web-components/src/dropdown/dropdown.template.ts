import { children, type ElementViewTemplate, html, ref } from '@microsoft/fast-element';
import { isListbox } from '../listbox/listbox.options.js';
import type { Dropdown } from './dropdown.js';

export const dropdownIndicatorTemplate = html<Dropdown>`
  <div slot="indicator" tabindex="-1" ${ref('indicator')}>
    <svg
      aria-hidden="true"
      class="chevron-down-20-regular"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width="20px"
      height="20px"
    >
      <path
        d="M15.85 7.65a.5.5 0 0 1 0 .7l-5.46 5.49a.55.55 0 0 1-.78 0L4.15 8.35a.5.5 0 1 1 .7-.7L10 12.8l5.15-5.16a.5.5 0 0 1 .7 0"
      />
    </svg>
  </div>
`;

export const dropdownInputTemplate = html<Dropdown>`
  <input
    @input="${(x, c) => x.inputHandler(c.event as InputEvent)}"
    @change="${(x, c) => x.changeHandler(c.event as InputEvent)}"
    aria-activedescendant="${x => (x.open ? x.activeDescendant : null)}"
    aria-controls="${x => x.listbox?.id ?? null}"
    aria-labelledby="${x => x.ariaLabelledBy}"
    aria-expanded="${x => x.open}"
    aria-haspopup="listbox"
    placeholder="${x => x.placeholder}"
    role="combobox"
    type="${x => x.type}"
    :value="${x => x.displayValue}"
    ${ref('control')}
  />
`;

export const dropdownButtonTemplate = html<Dropdown>`
  <button
    aria-activedescendant="${x => (x.open ? x.activeDescendant : null)}"
    aria-controls="${x => x.listbox?.id ?? null}"
    aria-expanded="${x => x.open}"
    aria-haspopup="listbox"
    role="combobox"
    ${ref('control')}
  >
    ${x => x.displayValue}
  </button>
`;

/**
 * Generates a template for the {@link (Dropdown:class)} component.
 *
 * @param options - The {@link (DropdownOptions:interface)} to use for generating the template.
 * @returns The template object.
 *
 * @public
 */
export function dropdownTemplate<T extends Dropdown>(): ElementViewTemplate<T> {
  return html<T>`
    <template
      @click="${(x, c) => x.clickHandler(c.event as PointerEvent)}"
      @focusout="${(x, c) => x.focusoutHandler(c.event as FocusEvent)}"
      @keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
      @mousedown="${(x, c) => x.mousedownHandler(c.event as MouseEvent)}"
      ${children({ property: 'listboxChildren', filter: isListbox })}
    >
      <div class="control">
        <slot name="control" ${ref('controlSlot')}></slot>
        <slot name="indicator" ${ref('indicatorSlot')}></slot>
      </div>
      <div
        class="popover"
        popover="manual"
        @beforetoggle="${(x, c) => x.beforetoggleHandler(c.event as ToggleEvent)}"
        ${ref('popoverContainer')}
      >
        <slot ${ref('listboxSlot')}></slot>
      </div>
    </template>
  `;
}

/**
 * Template for the Dropdown component.
 *
 * @public
 */
export const template: ElementViewTemplate<Dropdown> = dropdownTemplate();
