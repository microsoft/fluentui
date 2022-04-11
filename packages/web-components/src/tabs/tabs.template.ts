import { html, ref, slotted, when } from '@microsoft/fast-element';
import type { Tabs } from './tabs';

/**
 * The template for the Tabs component.
 * @public
 */
export const tabsTemplate = html<Tabs>`
  <template class="${x => x.orientation}">
    <div class="tablist" part="tablist" role="tablist">
      <slot class="tab" name="tab" part="tab" ${slotted('tabs')}></slot>

      ${when(
        x => x.showActiveIndicator,
        html<Tabs>` <div ${ref('activeIndicatorRef')} class="active-indicator" part="active-indicator"></div> `,
      )}
    </div>
    <div class="tabpanel" part="tabpanel">
      <slot name="tabpanel" part="tabpanel" ${slotted('tabpanels')}></slot>
    </div>
  </template>
`;
