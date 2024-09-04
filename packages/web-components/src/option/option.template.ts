import type { ElementViewTemplate } from '@microsoft/fast-element';
import { html } from '@microsoft/fast-element';
import { staticallyCompose } from '../utils/template-helpers.js'; 

import type { Option } from './option.js';
import type { OptionOptions } from './option.options.js';

const checkedIndicator = html.partial(/* html */ `
<svg aria-hidden="true" class="checkmark-16-filled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032"/></svg>
<svg aria-hidden="true" class="checkmark-12-regular" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12"><path d="M9.854 3.146a.5.5 0 0 1 0 .708l-4.5 4.5a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L5 7.293l4.146-4.147a.5.5 0 0 1 .708 0"/></svg>
`);

/**
 * Generates a template for the {@link (Option:class)} component.
 *
 * @param options - The {@link (OptionOptions:interface)} to use for generating the template.
 * @returns The template object.
 * @public
 */
export function optionTemplate<T extends Option>(options: OptionOptions = {}): ElementViewTemplate<T> {
  return html<T>`
    <template
      id="${x => x.id}"
      tabindex="${x => (x.disabled ? null : x.tabIndex ?? -1)}"
      @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
    >
      <slot name="checked-indicator">${staticallyCompose(options.checkedIndicator)}</slot>
      <slot></slot>
    </template>
  `;
}

/**
 * Template for the Option component.
 * @public
 */
export const template: ElementViewTemplate<Option> = optionTemplate({
  checkedIndicator,
});
