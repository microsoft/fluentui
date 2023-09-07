import { ElementViewTemplate, html } from '@microsoft/fast-element';
import type { CardPreview } from './card-preview.js';

/**
 * The template for the Fluent Card Preview web-component.
 * @public
 */
export function cardPreviewTemplate<T extends CardPreview>(): ElementViewTemplate<T> {
  return html<T>`
    <template>
      <slot></slot>
      <slot name="logo"></slot>
    </template>
  `;
}

export const template: ElementViewTemplate<CardPreview> = cardPreviewTemplate();
