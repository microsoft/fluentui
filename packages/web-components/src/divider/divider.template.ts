import { ElementViewTemplate, html } from '@microsoft/fast-element';
import type { Divider } from './divider.js';

/**
 * Template for the Divider component
 * @public
 */
export const template: ElementViewTemplate<Divider> = html<Divider>`
  <template
    class="${x => (x.hasChildNodes() ? 'children' : 'childless')}"
    role="${x => x.role}"
    aria-orientation="${x => (x.vertical ? 'vertical' : 'horizontal')}"
  >
    ${x => (x.hasChildNodes() ? html`<div class="wrapper" part="wrapper"><slot></slot></div>` : '')}
  </template>
`;
