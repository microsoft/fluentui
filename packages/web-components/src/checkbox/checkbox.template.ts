import type { ElementViewTemplate } from '@microsoft/fast-element';
import { html } from '@microsoft/fast-element';
import { staticallyCompose } from '../utils/template-helpers.js';
import type { Checkbox } from './checkbox.js';
import type { CheckboxOptions } from './checkbox.options.js';

const checkedIndicator = html.partial(/* html */ `
    <svg
        fill="currentColor"
        aria-hidden="true"
        class="checked-indicator"
        width="1em"
        height="1em"
        viewBox="0 0 12 12"
        xmlns="http://www.w3.org/2000/svg">
            <path d="M9.76 3.2c.3.29.32.76.04 1.06l-4.25 4.5a.75.75 0 0 1-1.08.02L2.22 6.53a.75.75 0 0 1 1.06-1.06l1.7 1.7L8.7 3.24a.75.75 0 0 1 1.06-.04Z" fill="currentColor"></path>
    </svg>
`);

const indeterminateIndicator = html.partial(/* html */ `
    <span class="indeterminate-indicator"></span>
`);

/**
 * Template for the Checkbox component
 * @public
 */
export function checkboxTemplate<T extends Checkbox>(options: CheckboxOptions = {}): ElementViewTemplate<T> {
  return html<T>`
    <template
      tabindex="${x => (!x.disabled ? 0 : void 0)}"
      @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
      @input="${(x, c) => x.inputHandler(c.event as Event)}"
      @keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
      @keyup="${(x, c) => x.keyupHandler(c.event as KeyboardEvent)}"
    >
      <slot name="checked-indicator">${staticallyCompose(options.checkedIndicator)}</slot>
      <slot name="indeterminate-indicator">${staticallyCompose(options.indeterminateIndicator)}</slot>
    </template>
  `;
}

/**
 * Template for the Checkbox component
 * @public
 */
export const template: ElementViewTemplate<Checkbox> = checkboxTemplate({
  checkedIndicator,
  indeterminateIndicator,
});
