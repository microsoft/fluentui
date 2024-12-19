import { type ElementViewTemplate, html, ref } from '@microsoft/fast-element';
import type { BaseDropdown } from './dropdown.js';

export const dropdownIndicatorTemplate = html<BaseDropdown>`
  <svg
    class="chevron-down-20-regular"
    role="button"
    slot="indicator"
    tabindex="${x => (!x.disabled ? -1 : void 0)}"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    ${ref('indicator')}
  >
    <path
      d="M15.85 7.65a.5.5 0 0 1 0 .7l-5.46 5.49a.55.55 0 0 1-.78 0L4.15 8.35a.5.5 0 1 1 .7-.7L10 12.8l5.15-5.16a.5.5 0 0 1 .7 0"
      fill="currentColor"
    />
  </svg>
`;

export const dropdownInputTemplate = html<BaseDropdown>`
  <input
    @input="${(x, c) => x.inputHandler(c.event as InputEvent)}"
    @change="${(x, c) => x.changeHandler(c.event as InputEvent)}"
    aria-activedescendant="${x => x.activeDescendant}"
    aria-controls="${x => x.listbox?.id ?? null}"
    aria-labelledby="${x => x.ariaLabelledBy}"
    aria-expanded="${x => x.open}"
    aria-haspopup="listbox"
    placeholder="${x => x.placeholder}"
    role="combobox"
    ?disabled="${x => x.disabled}"
    type="${x => x.type}"
    value="${x => x.valueAttribute}"
    ${ref('control')}
  />
`;

export const dropdownButtonTemplate = html<BaseDropdown>`
  <button
    aria-activedescendant="${x => x.activeDescendant}"
    aria-controls="${x => x.listbox?.id ?? null}"
    aria-expanded="${x => x.open}"
    aria-haspopup="listbox"
    role="combobox"
    ?disabled="${x => x.disabled}"
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
export function dropdownTemplate<T extends BaseDropdown>(): ElementViewTemplate<T> {
  return html<T>`
    <template
      @click="${(x, c) => x.clickHandler(c.event as PointerEvent)}"
      @focusout="${(x, c) => x.focusoutHandler(c.event as FocusEvent)}"
      @keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
      @mousedown="${(x, c) => x.mousedownHandler(c.event as MouseEvent)}"
    >
      <div class="control">
        <slot name="control" ${ref('controlSlot')}></slot>
        <slot name="indicator" ${ref('indicatorSlot')}></slot>
      </div>
      <slot ${ref('listboxSlot')}></slot>
    </template>
  `;
}

/**
 * Template for the Dropdown component.
 *
 * @public
 */
export const template: ElementViewTemplate<BaseDropdown> = dropdownTemplate();
