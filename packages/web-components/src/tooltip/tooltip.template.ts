import { html, ref } from '@microsoft/fast-element';
import type { Tooltip } from './tooltip.js';

/**
 * Template for the tooltip component
 * @public
 */
export const template = html<Tooltip>`
  <template ${ref('tooltip')} id="tooltip-${x => x.anchor}" popover="manual" aria-hidden="true">
    <slot></slot>
  </template>
`;
