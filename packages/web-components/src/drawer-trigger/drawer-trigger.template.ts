import { ElementViewTemplate, html, ref } from '@microsoft/fast-element';
import type { DrawerTrigger } from './drawer-trigger.js';

export function drawerTriggerTemplate<T extends DrawerTrigger>(): ElementViewTemplate<T> {
  return html<T>`
    <template
      drawer-id="${x => x.drawerID}"
      @dismiss="handleDismiss"
      @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
      ${ref('drawerButton')}
    >
      <slot></slot>
    </template>
  `;
}

export const template: ElementViewTemplate<DrawerTrigger> = drawerTriggerTemplate();
