import { ElementViewTemplate, html } from '@microsoft/fast-element';
import type { CardFooter } from './card-footer.js';

/**
 * The template for the Fluent Card Footer web-component.
 * @public
 */
export function cardFooterTemplate<T extends CardFooter>(): ElementViewTemplate<T> {
  return html<T>`
    <template>
      <div class="content" part="content">
        <slot></slot>
      </div>
      <div class="action">
        <slot name="action"></slot>
      </div>
    </template>
  `;
}

export const template: ElementViewTemplate<CardFooter> = cardFooterTemplate();
