import { endSlotTemplate, startSlotTemplate } from '@microsoft/fast-foundation/patterns.js';
import { FASTTab, TabOptions } from '@microsoft/fast-foundation/tab.js';
import { ElementViewTemplate, html } from '@microsoft/fast-element';

export function tabTemplate<T extends FASTTab>(options: TabOptions = {}): ElementViewTemplate<T> {
  return html<T>`
    <template slot="tab" role="tab" aria-disabled="${x => x.disabled}">
      ${startSlotTemplate(options)}
      <span class="tab-content"><slot></slot></span>
      ${endSlotTemplate(options)}
    </template>
  `;
}

export const template = tabTemplate({});
