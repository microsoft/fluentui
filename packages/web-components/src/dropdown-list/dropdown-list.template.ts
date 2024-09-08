import type { ElementViewTemplate } from '@microsoft/fast-element';
import { html, slotted } from '@microsoft/fast-element';

import { Option } from '../option/option.js';
import type { DropdownList } from './dropdown-list.js';

export const template: ElementViewTemplate<DropdownList> = html`
  <template>
    <slot
      ${slotted({
        property: 'options',
        filter: node => node instanceof Option,
      })}
    ></slot>
  </template>
`;
