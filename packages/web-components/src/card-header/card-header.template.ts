import { ElementViewTemplate, html } from '@microsoft/fast-element';
import type { CardHeader } from './card-header.js';

/**
 * The template for the Fluent Card Header web-component.
 * @public
 */
export function cardHeaderTemplate<T extends CardHeader>(): ElementViewTemplate<T> {
  return html<T>`
    <template>
      <slot name="start"></slot>
      <slot name="image"></slot>
      <div class="header">
        <slot name="header"></slot>
        <slot name="description"></slot>
      </div>
      <slot></slot>
      <slot name="action"></slot>
      <slot name="end"></slot>
    </template>
  `;
}

export const template: ElementViewTemplate<CardHeader> = cardHeaderTemplate();
