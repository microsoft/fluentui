import { html } from '@microsoft/fast-element';
import type { Checkbox } from './checkbox';

/**
 * The template for the {@link @microsoft/fast-foundation#(Checkbox:class)} component.
 * @public
 */
export const checkboxTemplate = html<Checkbox>`
  <template
    role="checkbox"
    aria-checked="${x => x.checked}"
    aria-required="${x => x.required}"
    aria-disabled="${x => x.disabled}"
    aria-readonly="${x => x.readOnly}"
    tabindex="${x => (x.disabled ? null : 0)}"
    @keypress="${(x, c) => x.keypressHandler(c.event as KeyboardEvent)}"
    @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
    class="${x => (x.indeterminate ? 'indeterminate' : '')}"
  >
    <div part="control" class="control">
      <slot name="checked-indicator">
        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path
            d="M13.86 3.66a.5.5 0 01-.02.7l-7.93 7.48a.6.6 0 01-.84-.02L2.4 9.1a.5.5 0 01.72-.7l2.4 2.44 7.65-7.2a.5.5 0 01.7.02z"
          />
        </svg>
      </slot>
      <slot name="indeterminate-indicator">
        <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M2 4c0-1.1.9-2 2-2h4a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2V4z"></path>
        </svg>
      </slot>
    </div>
    <slot></slot>
  </template>
`;
