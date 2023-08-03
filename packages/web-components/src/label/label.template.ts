import { ElementViewTemplate, html } from '@microsoft/fast-element';
import { Label } from './label.js';

/**
 * The template for the Fluent label web-component.
 * @public
 */
export function labelTemplate<T extends Label>(): ElementViewTemplate<T> {
  return html<T>`
    <template tabindex="${x => (x.disabled ? null : 0)}">
      <slot></slot>
      <span part="asterisk" class="asterisk" ?hidden="${x => !x.required}">*</span>
    </template>
  `;
}

export const template: ElementViewTemplate<Label> = labelTemplate();
