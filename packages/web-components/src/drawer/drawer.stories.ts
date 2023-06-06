import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Drawer as FluentDrawer, OpenEvent } from './drawer.js';
import './define.js';
import { DrawerPosition, DrawerSize } from './drawer.options.js';

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

const toggleDrawer = () => {
  const drawer = document.getElementById('drawer') as FluentDrawer;
  const main = document.getElementById('main') as HTMLElement;
  drawer.addEventListener('open', (event: any) => {
    if (event.detail.open) {
      let marginSize;
      switch (event.detail.controlSize) {
        case 'small':
          marginSize = 320;
          break;
        case 'medium':
          marginSize = 592;
          break;
        case 'large':
          marginSize = 940;
          break;
        default:
          marginSize = event.detail.controlSize;
      }
      if (event.detail.position === DrawerPosition.right) {
        main.style.marginRight = `${marginSize}px`;
      } else {
        main.style.marginLeft = `${marginSize}px`;
      }
    } else {
      main.style.margin = '0px';
    }
  });
  drawer.toggleDrawer();
};

const hideDrawer = () => {
  const drawer = document.getElementById('drawer') as FluentDrawer;
  drawer.hide();
};

const storyTemplate = html<DrawerStoryArgs>`
  <div>
    <style>
      div.docs-story > div:first-child {
        height: 38em;
        padding: 0;
      }
      .close-btn {
        background: transparent;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2px;
      }
    </style>
    <div style="height: 38em; transform: scale(1); overflow-y: hidden; overflow-x: hidden;">
      <div id="main" style="float: right; width: 200px;">
        <fluent-button appearance="primary" @click="${toggleDrawer}">Toggle Drawer</fluent-button>
      </div>
      <div>
        <fluent-drawer
          id="drawer"
          ?open="${x => x.open}"
          position="${x => x.position}"
          trap-focus="${x => x.trapFocus}"
          control-size="${x => x.controlSize}"
        >
          <div slot="header">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <fluent-text slot="header-start">Header</fluent-text>
              <button class="close-btn" slot="header-end" tabindex="0" @click="${hideDrawer}" aria-label="close">
                ${dismissed16Regular}
              </button>
            </div>
          </div>

          <fluent-text>
            The drawer gives users a quick entry point to configuration and information. It should be used when
            retaining context is beneficial to users. An overlay is optional depending on whether or not interacting
            with the background content is beneficial to the user’s context/scenario. An overlay makes the drawer
            blocking and signifies that the users full attention is required when making configurations.
          </fluent-text>
          <fluent-label>First Name</fluent-label>
          <input id="abc" type="text" />

          <fluent-label>Last Name</fluent-label>
          <input id="def" type="text" />

          <fluent-label>Email</fluent-label>
          <input id="ghi" type="text" />

          <fluent-label>Phone Number</fluent-label>
          <input id="jkl" type="text" />

          <div slot="actions">
            <fluent-button tabindex="0" appearance="primary">Primary</fluent-button>
            <fluent-button tabindex="0" appearance="secondary">Secondary</fluent-button>
          </div>
        </fluent-drawer>
      </div>
    </div>
  </div>
`;

export default {
  title: 'Components/Drawer',
  args: {
    disabled: false,
    position: DrawerPosition.right,
    open: false,
    trapFocus: true,
    controlSize: 'medium',
  },
  argTypes: {
    open: {
      control: {
        type: 'boolean',
      },
      table: {
        type: {
          summary: 'Sets the open state of drawer',
        },
        defaultValue: {
          summary: false,
        },
      },
    },
    trapFocus: {
      control: {
        type: 'boolean',
      },
      table: {
        type: {
          summary: 'Sets whether the drawer traps focus or not',
        },
        defaultValue: {
          summary: false,
        },
      },
    },
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
    controlSize: {
      options: Object.values(DrawerSize),
      control: {
        type: 'select',
      },
      table: {
        type: {
          summary: 'Sets the width of drawer',
        },
        defaultValue: {
          summary: DrawerSize.medium,
        },
      },
    },
  },
} as DrawerStoryMeta;

export const Drawer = renderComponent(storyTemplate).bind({});
