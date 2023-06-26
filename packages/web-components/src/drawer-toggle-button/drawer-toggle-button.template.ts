import { html } from '@microsoft/fast-element';
import { DrawerToggleButton } from '../drawer-toggle-button/drawer-toggle-button.js';

export const template = html<DrawerToggleButton>`
  <template>
    <fluent-button icon-only class="toggle-button" @click="${(x, c) => x.emitToggle()}">
      <slot></slot>
    </fluent-button>
  </template>
`;
