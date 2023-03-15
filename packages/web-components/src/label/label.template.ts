import { html } from '@microsoft/fast-element';
import { Label } from './label.js';

/**
 * The template for the Fluent label web-component.
 * @public
 */
export const template = html`
  <template
    required="${(attr: Label) => attr.required}"
    size="${(attr: Label) => attr.size}"
    weight="${(attr: Label) => attr.weight}"
    id="${(attr: Label) => attr.id}"
  >
    <slot></slot>
    ${(attr: Label) => (attr.required ? html`<span part="asterisk" class="asterisk">*</span>` : null)}
  </template>
`;
