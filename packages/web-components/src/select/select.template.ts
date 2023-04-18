import { ElementViewTemplate, html, repeat } from '@microsoft/fast-element';

import type { Select } from './select.js';

/**
 * Template for the Select component
 * @public
 */
export function selectTemplate<T extends Select>(): ElementViewTemplate<T> {
  return html<T>`
    <template>
      <label part="label" for="control" ?hidden="${x => !x.label}"> ${x => x.label} </label>
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
      <span class="this-does-nothing" hidden>
        <slot @slotchange=${x => x.handleSlotChange}></slot>
      </span>
    </template>
  `;
}

export const template: ElementViewTemplate<Select> = selectTemplate();
