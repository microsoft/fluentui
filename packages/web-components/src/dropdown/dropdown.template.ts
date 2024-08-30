import type { ElementViewTemplate } from '@microsoft/fast-element';
import { html } from '@microsoft/fast-element';

import type { Dropdown } from './dropdown.js';

export const template: ElementViewTemplate<Dropdown> = html`
  <template tabindex="${x => (x.disabled ? null : x.tabIndex ?? 0)}">
    Value display
  </template>
`;
