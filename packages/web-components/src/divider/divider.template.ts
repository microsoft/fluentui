import { ElementViewTemplate, html } from '@microsoft/fast-element';
import type { Divider } from './divider.js';

/**
 * Template for the Divider component
 * @public
 */
export const template: ElementViewTemplate<Divider> = html<Divider>`
  <template role="${x => x.role}" aria-orientation="${x => x.orientation}">
    <slot></slot>
  </template>
`;
