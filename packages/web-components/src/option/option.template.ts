import type { ElementViewTemplate } from '@microsoft/fast-element';
import { html } from '@microsoft/fast-element';

import type { Option } from './option.js';

export const template: ElementViewTemplate<Option> = html`
  <template tabindex="${x => (x.disabled ? null : x.tabIndex ?? -1)}">
    <slot></slot>
  </template>
`;
