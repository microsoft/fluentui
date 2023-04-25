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
      <div class="select-wrapper" part="select-wrapper">
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
        <span class="dropdown-arrow" part="dropdown-arrow">
          <slot name="dropdown-arrow">
            <svg
              fill="currentColor"
              aria-hidden="true"
              width="1em"
              height="1em"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.85 7.65c.2.2.2.5 0 .7l-5.46 5.49a.55.55 0 0 1-.78 0L4.15 8.35a.5.5 0 1 1 .7-.7L10 12.8l5.15-5.16c.2-.2.5-.2.7 0Z"
                fill="currentColor"
              ></path>
            </svg>
          </slot>
        </span>
      </div>
      <span hidden>
        <slot @slotchange=${x => x.handleSlotChange}></slot>
      </span>
    </template>
  `;
}

export const template: ElementViewTemplate<Select> = selectTemplate();
