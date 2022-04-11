import { html } from '@microsoft/fast-element';
import type { Radio } from './radio';

/**
 * The template for the Radio component.
 * @public
 */
export const radioTemplate = html<Radio>`
  <template
    role="radio"
    class="${x => (x.checked ? 'checked' : '')} ${x => (x.readOnly ? 'readonly' : '')}"
    aria-checked="${x => x.checked}"
    aria-required="${x => x.required}"
    aria-disabled="${x => x.disabled}"
    aria-readonly="${x => x.readOnly}"
    @keypress="${(x, c) => x.keypressHandler(c.event as KeyboardEvent)}"
    @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
  >
    <div part="control" class="control">
      <slot name="checked-indicator">
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 2a8 8 0 100 16 8 8 0 000-16z"></path>
        </svg>
      </slot>
    </div>
    <slot></slot>
  </template>
`;
