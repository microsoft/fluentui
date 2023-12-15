import { ElementViewTemplate, html, slotted } from '@microsoft/fast-element';
import { endSlotTemplate, startSlotTemplate } from '../patterns/index.js';
import { Tabs } from './tabs.js';
import { TabsOptions } from './tabs.options.js';

export function tabsTemplate<T extends Tabs>(options: TabsOptions = {}): ElementViewTemplate<T> {
  return html<T>`
    ${startSlotTemplate(options)}
    <div class="tablist" part="tablist" role="tablist">
      <slot name="tab" ${slotted('tabs')}></slot>
    </div>
    ${endSlotTemplate(options)}
    <div class="tabpanel" part="tabpanel">
      <slot name="tabpanel" ${slotted('tabpanels')}></slot>
    </div>
  `;
}

export const template = tabsTemplate({});
