import { html } from '@microsoft/fast-element';
import type { CardHeader } from './card-header';

/**
 * The template for the {@link @microsoft/fast-foundation#(Button:class)} component.
 * @public
 */
export const cardHeaderTemplate = html<CardHeader>`
  <template>
    <slot name="image"></slot>
    <div class="text-container" part="text-container">
      <slot></slot>
      <slot name="description"></slot>
    </div>
    <slot name="action"></slot>
  </template>
`;
