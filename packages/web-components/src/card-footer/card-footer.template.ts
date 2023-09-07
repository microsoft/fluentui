import { ElementViewTemplate, html } from '@microsoft/fast-element';
import type { CardFooter } from './card-footer.js';

/**
 * The template for the Fluent Card Footer web-component.
 * @public
 */
export function cardFooterTemplate<T extends CardFooter>(): ElementViewTemplate<T> {
  return html<T>`
    <template>
      <slot></slot>
    </template>
  `;
}

export const template: ElementViewTemplate<CardFooter> = cardFooterTemplate();
