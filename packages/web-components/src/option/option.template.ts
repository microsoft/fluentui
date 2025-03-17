import type { ElementViewTemplate } from '@microsoft/fast-element';
import { elements, html, slotted } from '@microsoft/fast-element';
import { startSlotTemplate } from '../patterns/start-end.js';
import { staticallyCompose } from '../utils/template-helpers.js';
import type { DropdownOption } from './option.js';
import type { DropdownOptionOptions } from './option.options.js';

const checkedIndicator = html.partial(/* html */ `
  <svg aria-hidden="true" class="checkmark-16-filled" viewBox="0 0 16 16">
    <path
      d="M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032"
    />
  </svg>
  <svg aria-hidden="true" class="checkmark-12-regular" viewBox="0 0 12 12">
    <path
      d="M9.854 3.146a.5.5 0 0 1 0 .708l-4.5 4.5a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L5 7.293l4.146-4.147a.5.5 0 0 1 .708 0"
    />
  </svg>
`);

/**
 * Generates a template for the {@link (Option:class)} component.
 *
 * @param options - The {@link (OptionOptions:interface)} to use for generating the template.
 * @returns The template object.
 * @public
 */
export function dropdownOptionTemplate<T extends DropdownOption>(
  options: DropdownOptionOptions = {},
): ElementViewTemplate<T> {
  return html<T>`
    <slot name="checked-indicator">${staticallyCompose(options.checkedIndicator)}</slot>
    ${startSlotTemplate(options)}
    <div class="content" part="content">
      <slot ${slotted({ property: 'freeformOutputs', filter: elements('output') })}></slot>
    </div>
    <div class="description" part="description">
      <slot name="description" ${slotted('descriptionSlot')}></slot>
    </div>
  `;
}

/**
 * Template for the Option component.
 * @public
 */
export const template: ElementViewTemplate<DropdownOption> = dropdownOptionTemplate({
  checkedIndicator,
});
