import { ElementViewTemplate, html } from '@microsoft/fast-element';
import { Label } from './label.js';

/**
 * The template for the Fluent label web-component.
 * @public
 */
export function labelTemplate<T extends Label>(): ElementViewTemplate<T> {
  return html<T>`
    <slot></slot>
    <span part="asterisk" class="asterisk" ?hidden="${x => !x.required}">*</span>
  `;
}

export const template: ElementViewTemplate<Label> = labelTemplate();
