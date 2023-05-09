import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import { ToolbarOrientation, ToolbarSize } from './toolbar.options.js';
import type { Toolbar as FluentToolbar } from './toolbar.js';
import './define.js';

type ToolbarStoryArgs = Args & FluentToolbar;
type ToolbarStoryMeta = Meta<ToolbarStoryArgs>;

const storyTemplate = html<ToolbarStoryArgs>`
  <fluent-toolbar orientation=${x => x.orientation} size=${x => x.size}>
    <span slot="label"><fluent-label weight="semibold" size="small">Label</fluent-label></span>
    <span slot="start"
      ><fluent-avatar appearance="ring" active="active" color="gold" shape="square" size="16"></fluent-avatar
    ></span>
    <fluent-button button appearance="secondary" shape="rounded" size="small">B</fluent-button>
    <fluent-button button appearance="secondary" shape="rounded" size="small">_</fluent-button>
    <fluent-button appearance="secondary" shape="rounded" size="small">I</fluent-button>
    <fluent-divider></fluent-divider>
    <fluent-menu-button appearance="secondary" shape="rounded" size="small"> Types </fluent-menu-button>
    <span slot="end">
      <fluent-button appearance="secondary" shape="rounded" size="small">X</fluent-button>
      <fluent-button appearance="secondary" shape="rounded" size="small">Y</fluent-button>
      <fluent-button appearance="secondary" shape="rounded" size="small">Z</fluent-button>
    </span>
  </fluent-toolbar>
`;

export default {
  title: 'Components/Toolbar',
  args: {
    orientation: 'horizontal',
    size: 'medium',
  },
  argTypes: {
    orientation: {
      description: 'Toolbar orientation',
      table: {
        defaultValue: {
          summary: 'horizontal',
        },
      },
      options: Object.values(ToolbarOrientation),
      control: 'select',
    },
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
