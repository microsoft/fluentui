import { ElementViewTemplate, html } from '@microsoft/fast-element';
import { endSlotTemplate, startSlotTemplate } from '@microsoft/fast-foundation';
import type { DrawerToolbar } from './drawer-toolbar.js';

const dismissed16Regular = html`
  <svg
    fill="currentColor"
    aria-hidden="true"
    width="1em"
    height="1em"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m2.59 2.72.06-.07a.5.5 0 0 1 .63-.06l.07.06L8 7.29l4.65-4.64a.5.5 0 0 1 .7.7L8.71 8l4.64 4.65c.18.17.2.44.06.63l-.06.07a.5.5 0 0 1-.63.06l-.07-.06L8 8.71l-4.65 4.64a.5.5 0 0 1-.7-.7L7.29 8 2.65 3.35a.5.5 0 0 1-.06-.63l.06-.07-.06.07Z"
      fill="currentColor"
    ></path>
  </svg>
`;

/**
 * The template for the DrawerToolbar component.
 * @public
 */
export function drawerToolbar<T extends DrawerToolbar>(): ElementViewTemplate<T> {
  return html<T>`
    <template slot="toolbar">
      <div class="toolbar">
        <div class="start">${startSlotTemplate({})}</div>
        <div class="default">
          <slot></slot>
        </div>
        <div class="end">
          ${endSlotTemplate({})}
          <fluent-button
            class="close"
            icon-only
            appearance="transparent"
            size="small"
            @click="${(x, c) => x.handleCloseClick()}"
          >
            ${dismissed16Regular}
          </fluent-button>
        </div>
      </div>
    </template>
  `;
}

export const template: ElementViewTemplate<DrawerToolbar> = drawerToolbar();
