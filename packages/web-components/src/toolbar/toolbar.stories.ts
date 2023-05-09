import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import { ToolbarSize } from './toolbar.options.js';
import type { Toolbar as FluentToolbar } from './toolbar.js';
import './define.js';

type ToolbarStoryArgs = Args & FluentToolbar;
type ToolbarStoryMeta = Meta<ToolbarStoryArgs>;

const Edit20Filled = html`<svg
  fill="currentColor"
  aria-hidden="true"
  width="20"
  height="20"
  viewBox="0 0 20 20"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M12.92 2.87a2.97 2.97 0 014.2 4.21l-.66.67-4.2-4.2.66-.68zm-1.38 1.38l-8 8c-.32.33-.55.74-.65 1.2l-.88 3.94a.5.5 0 00.6.6l3.92-.87c.47-.1.9-.34 1.24-.68l7.98-7.98-4.2-4.21z"
    fill="currentColor"
  ></path>
</svg>`;

const BookAddRegular = html` <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M14 3H6a1 1 0 00-1 1v11h4.02c.03.34.1.68.19 1H5a1 1 0 001 1h3.6c.18.36.4.7.66 1H6a2 2 0 01-2-2V4c0-1.1.9-2 2-2h8a2 2 0 012 2v5.2c-.32-.08-.66-.15-1-.18V4a1 1 0 00-1-1zM6 5v1a1 1 0 001 1h6a1 1 0 001-1V5a1 1 0 00-1-1H7a1 1 0 00-1 1zm1 0h6v1H7V5zm12 9.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm-4-2a.5.5 0 00-1 0V14h-1.5a.5.5 0 000 1H14v1.5a.5.5 0 001 0V15h1.5a.5.5 0 000-1H15v-1.5z"
  />
</svg>`;

const BroomRegular = html`<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M17.91 2.18c.2.2.2.51 0 .7l-5.32 5.33a4.5 4.5 0 01-.34 6l-.66.66-2.09 3.48a.5.5 0 01-.78.1l-7.07-7.08a.5.5 0 01.1-.78L5.22 8.5l.66-.66a4.5 4.5 0 015.99-.34l5.32-5.32c.2-.2.51-.2.71 0zM6.24 8.9l4.95 4.95.36-.35A3.5 3.5 0 106.6 8.55l-.36.35zm-.78.63L2.8 11.12l6.16 6.17 1.6-2.66-5.11-5.1z"
  />
</svg>`;

const storyTemplate = html<ToolbarStoryArgs>`
  <fluent-toolbar size=${x => x.size}>
    <span slot="label"><fluent-label weight="semibold" size="small">Label</fluent-label></span>
    <span slot="start"
      ><fluent-avatar appearance="ring" active="active" color="gold" shape="square" size="16"></fluent-avatar
    ></span>
    <fluent-button icon-only appearance="secondary" shape="rounded" size="small">${Edit20Filled}</fluent-button>
    <fluent-button icon-only appearance="secondary" shape="rounded" size="small">${BookAddRegular}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="secondary" shape="rounded" size="small">${BroomRegular}</fluent-button>
    <fluent-menu-button appearance="secondary" shape="rounded" size="small"> Types </fluent-menu-button>
    <fluent-radio-group aria-labelledby="label-1" name="radio-story" orientation="horizontal">
      <span id="label-1" slot="label">Favorite Fruit</span>
      <fluent-radio value="apple">Apple</fluent-radio>
      <fluent-radio value="pear">Pear</fluent-radio>
    </fluent-radio-group>
    <span slot="end">
      <fluent-button icon-only appearance="secondary" shape="rounded" size="small">X</fluent-button>
      <fluent-button icon-only appearance="secondary" shape="rounded" size="small">Y</fluent-button>
      <fluent-button icon-only appearance="secondary" shape="rounded" size="small">Z</fluent-button>
    </span>
  </fluent-toolbar>
`;

export default {
  title: 'Components/Toolbar',
  args: {
    size: 'medium',
  },
  argTypes: {
    size: {
      description: 'Toolbar size',
      table: {
        defaultValue: {
          summary: 'medium',
        },
      },
      options: Object.values(ToolbarSize),
      control: 'select',
    },
  },
} as ToolbarStoryMeta;

export const Toolbar = renderComponent(storyTemplate).bind({});

const verticalToolbar = html<ToolbarStoryArgs>`
  <fluent-toolbar orientation="vertical">
    <span slot="start"
      ><fluent-avatar appearance="ring" active="active" color="gold" shape="square" size="16"></fluent-avatar
    ></span>
    <fluent-button icon-only appearance="secondary" shape="rounded" size="small">${Edit20Filled}</fluent-button>
    <fluent-button icon-only appearance="secondary" shape="rounded" size="small">${BookAddRegular}</fluent-button>
    <fluent-divider orientation="horizontal"></fluent-divider>
    <fluent-button icon-only appearance="secondary" shape="rounded" size="small">${BroomRegular}</fluent-button>
    <span slot="end">
      <fluent-button icon-only appearance="secondary" shape="rounded" size="small">X</fluent-button>
      <fluent-button icon-only appearance="secondary" shape="rounded" size="small">Y</fluent-button>
      <fluent-button icon-only appearance="secondary" shape="rounded" size="small">Z</fluent-button>
    </span>
  </fluent-toolbar>
`;

export const VerticalToolbar = renderComponent(verticalToolbar).bind({});
