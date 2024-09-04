import type { ElementViewTemplate } from '@microsoft/fast-element';
import { html } from '@microsoft/fast-element';

import type { DropdownList } from './dropdown-list.js';

export const template: ElementViewTemplate<DropdownList> = html`
  <template>
    <slot></slot>
  </template>
`;
