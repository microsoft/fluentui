import { html, ref, slotted, when } from '@microsoft/fast-element';
import { Popover } from './popover.js';

export const template = html<Popover>`
  <slot name="anchor" ${slotted('anchorRef')}></slot>
  ${when(
    x => x.open,
    html`
      <div class="popover-content" ${ref('popoverContentRef')}>
        ${when(x => x.arrow, html`<div class="popover-arrow" ${ref('arrowRef')}></div>`)}
        <slot></slot>
      </div>
    `,
  )}
`;
