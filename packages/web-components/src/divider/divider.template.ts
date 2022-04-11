import { html, when } from '@microsoft/fast-element';
import type { Divider } from './divider';

/**
 * The template for the Divider component.
 * @public
 */
export const dividerTemplate = html<Divider>`
  <template
    class=${x => (x.hasChildNodes() ? 'children' : 'childless')}
    role="${x => x.role}"
    aria-orientation="${x => (x.vertical ? 'vertical' : 'horizontal')}"
  >
    ${when(x => x.hasChildNodes(), html`<div class="wrapper" part="wrapper"><slot></slot></div>`)}
  </template>
`;
