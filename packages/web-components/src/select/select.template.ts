import { ElementViewTemplate, html, repeat } from '@microsoft/fast-element';

import type { Select } from './select.js';

/**
 * Template for the Select component
 * @public
 */
export function selectTemplate<T extends Select>(): ElementViewTemplate<T> {
  return html<T>`
    <template>
      <label part="label"><slot name="label"></slot></label>
      <select
        part="control"
        :autofocus="${x => x.autofocus}"
        :autocomplete="${x => x.autocomplete}"
        ?disabled="${x => x.disabled}"
        @change="${x => x.handleChange()}"
        @input="${x => x.handleInput()}"
      >
        ${repeat(
          x => x.options,
          html`<option ?selected=${opt => opt.selected} value=${opt => opt.value}>${opt => opt.innerText}</option>`,
        )}
      </select>
      <span hidden>
        <slot @slotchange=${x => x.handleSlotChange}></slot>
      </span>
      <span part="dropdown-arrow">
        <slot name="dropdown-arrow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-chevron-down"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </slot>
      </span>
    </template>
  `;
}

export const template: ElementViewTemplate<Select> = selectTemplate();
