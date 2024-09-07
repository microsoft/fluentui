import type { ElementViewTemplate } from '@microsoft/fast-element';
import { html } from '@microsoft/fast-element';
import { staticallyCompose } from '../utils/template-helpers.js';

import type { Dropdown } from './dropdown.js';
import type { DropdownOptions } from './dropdown.options.js';

const triggerIndicator = html.partial(/* html */ `
<svg viewBox="0 0 12 7" aria-hidden="true"><path d="M11.8527 0.645818C12.0484 0.840732 12.0489 1.15731 11.854 1.35292L6.38902 6.83741C6.17408 7.05312 5.82477 7.05312 5.60982 6.83741L0.14484 1.35292C-0.0500734 1.15731 -0.0495088 0.840731 0.1461 0.645817C0.34171 0.450903 0.658292 0.451467 0.853206 0.647077L5.99942 5.81166L11.1456 0.647077C11.3406 0.451468 11.6571 0.450904 11.8527 0.645818Z"/></svg>
`);

/**
 * Generates a template for the {@link (Dropdown:class)} component.
 *
 * @param options - The {@link (DropdownOptions:interface)} to use for generating the template.
 * @returns The template object.
 * @public
 */
export function dropdownTemplate<T extends Dropdown>(options: DropdownOptions = {}): ElementViewTemplate<T> {
  return html<T>`
    <template tabindex="${x => (x.disabled ? null : x.getAttribute('tabindex') ?? '0')}">
      <div class="content">Value display</div>
      <div class="trigger-indicator">
        <slot name="trigger-indicator">${staticallyCompose(options.triggerIndicator)}</slot>
      </div>
    </template>
  `;
}

/**
 * Template for the Dropdown component.
 * @public
 */
export const template: ElementViewTemplate<Dropdown> = dropdownTemplate({
  triggerIndicator,
});
