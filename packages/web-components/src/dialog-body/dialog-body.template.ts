import { type ElementViewTemplate, html, ref } from '@microsoft/fast-element';

/**
 * Template for the dialog form
 * @public
 */
export const template: ElementViewTemplate = html`
  <template>
    <div class="title" part="title">
      <slot name="title"></slot>
      <slot name="title-action"></slot>
      <slot name="close" @click="${(x, c) => x.clickHandler(c.event as PointerEvent)}"></slot>
    </div>
    <div class="content" part="content"><slot></slot></div>
    <div class="actions" part="actions"><slot name="action"></slot></div>
  </template>
`;
