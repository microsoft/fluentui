import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Drawer as FluentDrawer } from './drawer.js';
import './define.js';
import { DrawerPosition } from './drawer.options.js';

type DrawerStoryArgs = Args & FluentDrawer;
type DrawerStoryMeta = Meta<DrawerStoryArgs>;

const dismissed16Regular = html`<svg
  fill="currentColor"
  aria-hidden="true"
  width="16"
  height="16"
  viewBox="0 0 16 16"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="m2.59 2.72.06-.07a.5.5 0 0 1 .63-.06l.07.06L8 7.29l4.65-4.64a.5.5 0 0 1 .7.7L8.71 8l4.64 4.65c.18.17.2.44.06.63l-.06.07a.5.5 0 0 1-.63.06l-.07-.06L8 8.71l-4.65 4.64a.5.5 0 0 1-.7-.7L7.29 8 2.65 3.35a.5.5 0 0 1-.06-.63l.06-.07-.06.07Z"
    fill="currentColor"
  ></path>
</svg>`;

const storyTemplate = html<DrawerStoryArgs>`
  <div>
    <style>
      div.docs-story > div:first-child {
        height: 38em !important;
        padding: 0;
      }
    </style>
    <div style="height: 37em; transform: scale(1)">
      <fluent-drawer id="drawer" open="${x => x.open}" position="${x => x.position}">
        <div slot="header">Header</div>
        <div slot="close">${dismissed16Regular}</div>
        <fluent-text>
          The drawer gives users a quick entry point to configuration and information. It should be used when retaining
          context is beneficial to users. An overlay is optional depending on whether or not interacting with the
          background content is beneficial to the user’s context/scenario. An overlay makes the drawer blocking and
          signifies that the users full attention is required when making configurations.
        </fluent-text>
        <div slot="actions">
          <fluent-button appearance="primary">Primary</fluent-button>
          <fluent-button appearance="secondary">Secondary</fluent-button>
        </div>
      </fluent-drawer>
    </div>
  </div>
`;

export default {
  title: 'Components/Drawer',
  args: {
    disabled: false,
    position: DrawerPosition.right,
    open: false,
  },
  argTypes: {
    position: {
      options: Object.values(DrawerPosition),
      control: {
        type: 'select',
      },
      table: {
        type: {
          summary: 'Sets the position of drawer',
        },
        defaultValue: {
          summary: DrawerPosition.right,
        },
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        type: {
          summary: 'Sets disabled state',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
} as DrawerStoryMeta;

export const Drawer = renderComponent(storyTemplate).bind({});
