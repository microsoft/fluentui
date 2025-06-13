import { type ElementViewTemplate, html } from '@microsoft/fast-element';
import type { Label } from './label.js';

/**
 * The template for the Fluent label web-component.
 * @public
 */
export function labelTemplate<T extends Label>(): ElementViewTemplate<T> {
  return html<T>`
    <slot></slot>
    <span part="asterisk" class="asterisk" aria-hidden="true" ?hidden="${x => !x.required}">*</span>
  `;
}

export const template: ElementViewTemplate<Label> = labelTemplate();
