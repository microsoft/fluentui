import { type ElementViewTemplate, html, ref, slotted } from '@microsoft/fast-element';
import type { BaseLabel } from './label.base.js';
import type { Label } from './label.js';

/**
 * The template partial for the slotted label element.
 *
 * @public
 * @remarks
 * Since the label element must be present in the light DOM for ARIA to function correctly, this template should not be
 * overridden.
 * @see {@link BaseLabel.insertLabel}
 */
export const labelElementTemplate = html<BaseLabel>`<label for="${x => x.htmlFor}" ${ref('labelElement')}></label>`;

/**
 * The template for the Fluent label web-component.
 * @public
 */
export function labelTemplate<T extends Label>(): ElementViewTemplate<T> {
  return html<T>`
    <template @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}">
      <slot ${slotted('defaultSlottedContent')}></slot>
      <span aria-hidden="true" part="asterisk" class="asterisk" ?hidden="${x => !x.required}">*</span>
    </template>
  `;
}

export const template: ElementViewTemplate<Label> = labelTemplate();
