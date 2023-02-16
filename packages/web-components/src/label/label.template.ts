import { html } from '@microsoft/fast-element';
import { Label } from './label.js';

/**
 * The template for the Fluent label web-component.
 * @public
 */
export const template = html`
  <template required="${(attr: Label) => attr.required}">
    <label class="label" part="label" for="${(attr: Label) => attr.for}" form="${(attr: Label) => attr.form}">
      <slot></slot>
      ${(attr: Label) => (attr.required ? html`<span part="asterisk" class="asterisk">*</span>` : null)}
      <slot name="icon"></slot>
    </label>
  </template>
`;
