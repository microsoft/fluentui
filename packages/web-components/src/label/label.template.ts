import { html } from '@microsoft/fast-element';
import { Label } from './label.js';

/**
 * The template for the Fluent label web-component.
 * @public
 */
export const template = html`
  <slot></slot>
  <span part="asterisk" class="asterisk" ?hidden="${x => !x.required}">*</span>
`;
