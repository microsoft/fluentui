import { ElementViewTemplate, html } from '@microsoft/fast-element';
import { endSlotTemplate, startSlotTemplate } from '../patterns/index.js';
import type { Tab, TabOptions } from './tab.js';

export function tabTemplate<T extends Tab>(options: TabOptions = {}): ElementViewTemplate<T> {
  return html<T>`
    <template slot="tab" role="tab" aria-disabled="${x => x.disabled}">
      ${startSlotTemplate(options)}
      <span class="tab-content"><slot></slot></span>
      ${endSlotTemplate(options)}
    </template>
  `;
}

export const template = tabTemplate({});
