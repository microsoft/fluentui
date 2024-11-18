import { html } from '@microsoft/fast-element';
import type { Tooltip } from './tooltip.js';

/**
 * Template for the tooltip component
 * @public
 */
export const template = html<Tooltip>`
  <template popover aria-hidden="true">
    <slot></slot>
  </template>
`;
