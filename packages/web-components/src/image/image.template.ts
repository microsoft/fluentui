import { ElementViewTemplate, html } from '@microsoft/fast-element';
import type { Image } from './image.js';

/**
 * Template for the Divider component
 * @public
 */
export const template: ElementViewTemplate<Image> = html<Image>`
  <template role="${x => x.role}" aria-orientation="${x => x.orientation}">
    <slot></slot>
  </template>
`;
