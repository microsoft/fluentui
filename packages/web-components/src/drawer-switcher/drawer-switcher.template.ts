import { html, repeat } from '@microsoft/fast-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import type { Drawer } from '../drawer/drawer.js';
import type { DrawerSwitcher } from './drawer-switcher.js';

export const template = html<DrawerSwitcher>`
  <template>
    ${repeat(
      x => x.drawerElements,
      html<Drawer>`
        <fluent-button icon-only @click="${(x, ctx) => ctx.parent.toggleDrawer(x)}">
          ${x => unsafeHTML(x.getIcon())}
        </fluent-button>
      `,
    )}
    <slot></slot>
  </template>
`;
