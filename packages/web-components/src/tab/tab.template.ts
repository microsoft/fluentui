import { endSlotTemplate, FASTTab, startSlotTemplate, TabOptions } from '@microsoft/fast-foundation';
import { ElementViewTemplate, html } from '@microsoft/fast-element';

export function tabTemplate<T extends FASTTab>(options: TabOptions = {}): ElementViewTemplate<T> {
  return html<T>`
    <template slot="tab" role="tab" aria-disabled="${x => x.disabled}">
      ${startSlotTemplate(options)}
      <span part="tab-content"><slot></slot></span>
      <span part="indicator-placeholder" aria-hidden="true"></span>
      ${endSlotTemplate(options)}
    </template>
  `;
}

export const template = tabTemplate({});
