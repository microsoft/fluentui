import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Drawer as FluentDrawer } from './drawer.js';
import './define.js';
import '../text/define.js';
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

const arrowLeft16Regular = html`<svg
  fill="currentColor"
  aria-hidden="true"
  width="16"
  height="16"
  viewBox="0 0 16 16"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M13.5 8.5a.5.5 0 0 0 0-1H3.8l4.03-3.63a.5.5 0 1 0-.66-.74l-5 4.5a.5.5 0 0 0 0 .74l5 4.5a.5.5 0 1 0 .66-.74L3.8 8.5h9.7Z"
    fill="currentColor"
  ></path>
</svg>`;

const arrowClockwise16Regular = html`<svg
  fill="currentColor"
  class="___12fm75w f1w7gpdv fez10in fg4l7m0"
  aria-hidden="true"
  width="16"
  height="16"
  viewBox="0 0 16 16"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M3 8a5 5 0 0 1 9-3H9.5a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-1 0v1.03A6 6 0 1 0 14 8a.5.5 0 0 0-1 0A5 5 0 0 1 3 8Z"
    fill="currentColor"
  ></path>
</svg>`;

const settings16Regular = html`<svg
  fill="currentColor"
  class="___12fm75w f1w7gpdv fez10in fg4l7m0"
  aria-hidden="true"
  width="16"
  height="16"
  viewBox="0 0 16 16"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M8 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM7 8a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm3.62-3.6a.7.7 0 0 1-.83-.57l-.26-1.42a.35.35 0 0 0-.27-.28 6.07 6.07 0 0 0-2.52 0 .35.35 0 0 0-.27.29L6.2 3.83a.71.71 0 0 1-.94.54l-1.36-.49a.36.36 0 0 0-.38.1c-.57.63-1 1.37-1.26 2.17-.05.14 0 .29.1.38l1.1.93a.7.7 0 0 1 0 1.08l-1.1.93c-.1.1-.15.24-.1.38.26.8.69 1.54 1.26 2.17.1.1.25.14.38.1l1.36-.49a.7.7 0 0 1 .94.54l.26 1.41c.02.15.13.26.27.29a6.07 6.07 0 0 0 2.52 0 .35.35 0 0 0 .27-.29l.26-1.41a.71.71 0 0 1 .94-.54l1.36.49c.13.04.28 0 .38-.1.57-.63 1-1.37 1.26-2.17a.35.35 0 0 0-.1-.38l-1.1-.93a.7.7 0 0 1 0-1.08l1.1-.93c.1-.1.15-.24.1-.38-.26-.8-.69-1.54-1.26-2.17a.36.36 0 0 0-.38-.1l-1.36.49a.71.71 0 0 1-.11.03ZM4 4.98l.94.33a1.71 1.71 0 0 0 2.25-1.3l.18-.97a5.1 5.1 0 0 1 1.26 0l.18.97a1.7 1.7 0 0 0 2.25 1.3l.94-.33c.26.33.47.7.63 1.08l-.75.64a1.7 1.7 0 0 0 0 2.6l.75.64c-.16.39-.37.75-.63 1.08l-.94-.33a1.7 1.7 0 0 0-2.25 1.3l-.18.97a5.1 5.1 0 0 1-1.26 0l-.18-.97a1.7 1.7 0 0 0-2.25-1.3l-.94.33c-.26-.33-.47-.7-.63-1.08l.75-.64a1.7 1.7 0 0 0 0-2.6l-.75-.64c.16-.39.37-.75.63-1.08Z"
    fill="currentColor"
  ></path>
</svg>`;

const toggleDrawer = (drawerID: string, containerID: string) => {
  const drawer = document.getElementById(drawerID) as FluentDrawer;
  const main = document.getElementById(containerID) as HTMLElement;
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
      if (event.detail.position === DrawerPosition.left) {
        main.style.marginLeft = `${marginSize}px`;
      } else {
        main.style.marginRight = `${marginSize}px`;
      }
    } else {
      main.style.margin = '0px';
    }
  });
  drawer.toggleDrawer();
};

const hideDrawer = (drawerID: string) => {
  const drawer = document.getElementById(drawerID) as FluentDrawer;
  drawer.hide();
};

const storyTemplate = html<DrawerStoryArgs>`
  <div>
    <style>
     .sbdocs-content {
        max-width: 1200px;
      }
      .toolbar-button {
        background: transparent;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2px;
      }
    </style>
    <div style="height: 38em; transform: scale(1); overflow-y: hidden; overflow-x: hidden;">
      <div id="main" style="display: flex; justify-content: center; align-items: center; height: 100%;">
        <fluent-button appearance="primary" @click="${() =>
          toggleDrawer('drawer-playground', 'main')}">Toggle Drawer</fluent-button>
      </div>
      <div>
        <fluent-drawer
          id="drawer-playground"
          ?open="${x => x.open}"
          position="${x => x.position}"
          trap-focus="${x => x.trapFocus}"
          control-size="${x => x.controlSize}"
          modal="${x => x.modal}"
        >
          <div slot="header">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <fluent-text font="base" size="500" weight="semibold">Header</fluent-text>
              <fluent-button class="toolbar-button" appearance="transparent" icon-only size="small" tabindex="0" @click="${() =>
                hideDrawer('drawer-playground')}" aria-label="close">
                ${dismissed16Regular}
              </fluent-button>
            </div>
          </div>
          <div style="display: flex; row-gap: 16px; flex-direction: column;">
            <fluent-text>
              The drawer gives users a quick entry point to configuration and information. It should be used when
              retaining context is beneficial to users.
            </fluent-text>
            <div>
              <fluent-label>Name</fluent-label>
              <fluent-text-input id="abc" type="text"></fluent-text-input>
            </div>
            <div>
              <fluent-label>Key</fluent-label>
              <fluent-text-input id="def" type="text" /></fluent-text-input>
            </div>
            <div>
              <fluent-radio-group>
                <fluent-label slot="label">Please select an option</fluent-label>
                <fluent-radio value="1">Option 1</fluent-radio>
                <fluent-radio value="2">Option 2</fluent-radio>
                <fluent-radio value="3">Option 3</fluent-radio>
              </fluent-radio-group>
            </div>
            <div>
              <fluent-switch label-position="after" value="Enable option">
                Activate option
              </fluent-switch>
            </div>
          </div>
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
    trapFocus: false,
    modal: false,
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
    modal: {
      control: {
        type: 'boolean',
      },
      table: {
        type: {
          summary: 'Determines if drawer is a modal or not',
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

export const PositionLeft = renderComponent(html<DrawerStoryArgs>`
<div>
    <style>
      div.docs-story > div:first-child {
        height: 38em;
        padding: 0;
      }
      .toolbar-button {
        background: transparent;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2px;
      }
    </style>
    <div style="height: 38em; transform: scale(1); overflow-y: hidden; overflow-x: hidden;">
      <div>
        <fluent-drawer
          id="drawer-left"
          position="left"
          open
        >
          <div slot="header">
            <div style="display: flex; justify-content: space-between; align-items: center;">
            <fluent-text font="base" size="500" weight="semibold">Drawer Position left</fluent-text>
              <fluent-button class="toolbar-button" appearance="transparent" icon-only size="small" tabindex="0"aria-label="close">
                ${dismissed16Regular}
              </fluent-button>
            </div>
          </div>
          <div style="display: flex; row-gap: 16px; flex-direction: column;">

          <fluent-text>
            The drawer gives users a quick entry point to configuration and information. It should be used when
            retaining context is beneficial to users.
          </fluent-text>
            <div>
          <fluent-label>First Name</fluent-label>
          <fluent-text-input id="abc" type="text"></fluent-text-input>
          </div>

          <div>

          <fluent-label>Last Name</fluent-label>
          <fluent-text-input id="def" type="text" /></fluent-text-input>
          </div>

          <div>

          <fluent-label>Email</fluent-label>
          <fluent-text-input id="ghi" type="text" /></fluent-text-input>
          </div>

          <div>

          <fluent-label>Phone Number</fluent-label>
          <fluent-text-input id="jkl" type="text" /></fluent-text-input>
          </div>

          </div>
          <div slot="actions">
            <fluent-button tabindex="0" appearance="primary">Primary</fluent-button>
            <fluent-button tabindex="0" appearance="secondary">Secondary</fluent-button>
          </div>
        </fluent-drawer>
      </div>
    </div>
  </div>
`);

export const DrawerControlSizeSmall = renderComponent(html<DrawerStoryArgs>`
    <div style="height: 38em; transform: scale(1); overflow-y: hidden; overflow-x: hidden;">

        <fluent-drawer
          id="drawer-small"
          control-size="small"
          open
        >
          <div slot="header">
            <div style="display: flex; justify-content: space-between; align-items: center;">
            <fluent-text font="base" size="500" weight="semibold">Drawer Small</fluent-text>
            <fluent-button class="toolbar-button" appearance="transparent" icon-only size="small" tabindex="0"aria-label="close">
                ${dismissed16Regular}
              </fluent-button>
            </div>
          </div>
          <div style="display: flex; row-gap: 16px; flex-direction: column;">

          <fluent-text>
            The drawer gives users a quick entry point to configuration and information. It should be used when
            retaining context is beneficial to users.
          </fluent-text>
            <div>
          <fluent-label>First Name</fluent-label>
          <fluent-text-input id="abc" type="text"></fluent-text-input>
          </div>

          <div>

          <fluent-label>Last Name</fluent-label>
          <fluent-text-input id="def" type="text" /></fluent-text-input>
          </div>

          <div>

          <fluent-label>Email</fluent-label>
          <fluent-text-input id="ghi" type="text" /></fluent-text-input>
          </div>

          <div>

          <fluent-label>Phone Number</fluent-label>
          <fluent-text-input id="jkl" type="text" /></fluent-text-input>
          </div>

          </div>
          <div slot="actions">
            <fluent-button tabindex="0" appearance="primary">Primary</fluent-button>
            <fluent-button tabindex="0" appearance="secondary">Secondary</fluent-button>
          </div>
        </fluent-drawer>
      </div>
`);

export const DrawerControlSizeMedium = renderComponent(html<DrawerStoryArgs>`
    <div style="height: 38em; transform: scale(1); overflow-y: hidden; overflow-x: hidden;">

        <fluent-drawer
          id="drawer-medium"
          open
        >
          <div slot="header">
            <div style="display: flex; justify-content: space-between; align-items: center;">
            <fluent-text font="base" size="500" weight="semibold">Drawer Medium</fluent-text>
            <fluent-button class="toolbar-button" appearance="transparent" icon-only size="small" tabindex="0"aria-label="close">
                ${dismissed16Regular}
              </fluent-button>
            </div>
          </div>
          <div style="display: flex; row-gap: 16px; flex-direction: column;">

          <fluent-text>
            The drawer gives users a quick entry point to configuration and information. It should be used when
            retaining context is beneficial to users.
          </fluent-text>
            <div>
          <fluent-label>First Name</fluent-label>
          <fluent-text-input id="abc" type="text"></fluent-text-input>
          </div>

          <div>

          <fluent-label>Last Name</fluent-label>
          <fluent-text-input id="def" type="text" /></fluent-text-input>
          </div>

          <div>

          <fluent-label>Email</fluent-label>
          <fluent-text-input id="ghi" type="text" /></fluent-text-input>
          </div>

          <div>

          <fluent-label>Phone Number</fluent-label>
          <fluent-text-input id="jkl" type="text" /></fluent-text-input>
          </div>

          </div>
          <div slot="actions">
            <fluent-button tabindex="0" appearance="primary">Primary</fluent-button>
            <fluent-button tabindex="0" appearance="secondary">Secondary</fluent-button>
          </div>
        </fluent-drawer>
      </div>
`);

export const DrawerControlSizeLarge = renderComponent(html<DrawerStoryArgs>`
    <div style="height: 38em; transform: scale(1); overflow-y: hidden; overflow-x: hidden;">

        <fluent-drawer
          id="drawer-large"
          control-size="large"
          open
        >
          <div slot="header">
            <div style="display: flex; justify-content: space-between; align-items: center;">
            <fluent-text font="base" size="500" weight="semibold">Drawer Large</fluent-text>
              <fluent-button class="toolbar-button" appearance="transparent" icon-only size="small" tabindex="0"aria-label="close">
                ${dismissed16Regular}
              </fluent-button>
            </div>
          </div>
          
          <fluent-text style="margin-bottom: 20px; display: block;">
            The drawer gives users a quick entry point to configuration and information.
            <br /> 
            It should be used when retaining context is beneficial to users.
          </fluent-text>
          <div style="display: grid; grid-template-columns: 1fr 1fr; row-gap: 16px; flex-direction: row;">    
            <div style="display: flex; row-gap: 16px; flex-direction: column;">
              <div>
                <fluent-label>First Name</fluent-label>
                <fluent-text-input id="abc" type="text"></fluent-text-input>
              </div>

              <div>
                <fluent-label>Last Name</fluent-label>
                <fluent-text-input id="def" type="text" /></fluent-text-input>
              </div>

              <div>
                <fluent-label>Email</fluent-label>
                <fluent-text-input id="ghi" type="text" /></fluent-text-input>
              </div>

              <div>
                <fluent-label>Phone Number</fluent-label>
                <fluent-text-input id="jkl" type="text" /></fluent-text-input>
              </div>

            </div>
            <div style="display: flex; row-gap: 16px; flex-direction: column;">
              <div>
                <fluent-label>Address</fluent-label>
                <fluent-text-input id="mno" type="text"></fluent-text-input>
              </div>

              <div>
                <fluent-label>Secondary Address</fluent-label>
                <fluent-text-input id="pqr" type="text" /></fluent-text-input>
              </div>
              <div>
                  <fluent-radio-group>
                    <fluent-label slot="label">Please select an option</fluent-label>
                    <fluent-radio value="1">Option 1</fluent-radio>
                    <fluent-radio value="2">Option 2</fluent-radio>
                    <fluent-radio value="3">Option 3</fluent-radio>
                  </fluent-radio-group>
              </div>
            </div>
          </div>
          <div slot="actions">
            <fluent-button tabindex="0" appearance="primary">Primary</fluent-button>
            <fluent-button tabindex="0" appearance="secondary">Secondary</fluent-button>
          </div>
        </fluent-drawer>
      </div>
`);

export const DrawerAsModal = renderComponent(html`
    <div style="height: 38em; transform: scale(1); overflow-y: hidden; overflow-x: hidden;">
        <fluent-drawer
          id="drawer-modal"
          modal
          open
        >
          <div slot="header">
            <div style="display: flex; justify-content: space-between; align-items: center;">
            <fluent-text font="base" size="500" weight="semibold">Drawer as Modal</fluent-text>
              <fluent-button class="toolbar-button" appearance="transparent" icon-only size="small" tabindex="0"aria-label="close">
                ${dismissed16Regular}
              </fluent-button>
            </div>
          </div>
          <div style="display: flex; row-gap: 16px; flex-direction: column;">
            <fluent-text>
              Rendering the Drawer as a modal enables a blocking overlay that signifies that the users full attention is required when making configurations.
            </fluent-text>    
            <div>
              <fluent-label>First Name</fluent-label>
              <fluent-text-input id="abc" type="text"></fluent-text-input>
            </div>
            <div>
              <fluent-label>Last Name</fluent-label>
              <fluent-text-input id="def" type="text" /></fluent-text-input>
            </div>
            <div>
              <fluent-label>Email</fluent-label>
              <fluent-text-input id="ghi" type="text" /></fluent-text-input>
            </div>
            <div>
              <fluent-label>Phone Number</fluent-label>
              <fluent-text-input id="jkl" type="text" /></fluent-text-input>
            </div>
          </div>
          <div slot="actions">
            <fluent-button tabindex="0" appearance="primary">Primary</fluent-button>
            <fluent-button tabindex="0" appearance="secondary">Secondary</fluent-button>
          </div>
        </fluent-drawer>
      </div>
`);

export const DrawerWithToolbar = renderComponent(html`
<div style="height: 38em; transform: scale(1); overflow-y: hidden; overflow-x: hidden;">
    <fluent-drawer
      id="drawer-toolbar"
      open
      toolbar
    >
      <div slot="toolbar">
        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
            <div style="display: flex">
              <fluent-button appearance="transparent" icon-only size="small" class="toolbar-button" tabindex="0" aria-label="back">
              ${arrowLeft16Regular}
              </fluent-button>
            </div>
            <div style="display: flex">     
              <fluent-button appearance="transparent" icon-only size="small" class="toolbar-button" tabindex="0"  aria-label="close">
                  ${arrowClockwise16Regular}
                </fluent-button>
                <fluent-button appearance="transparent" icon-only size="small" class="toolbar-button" tabindex="0"  aria-label="close">
                  ${settings16Regular}
                </fluent-button>

                <fluent-button appearance="transparent" icon-only size="small" class="toolbar-button" tabindex="0"  aria-label="close">
                ${dismissed16Regular}
                </fluent-button>
            </div>
        </div>
      </div>
      <div slot="header">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <fluent-text font="base" size="500" weight="semibold">Drawer with Toolbar</fluent-text>
        </div>
      </div>
      <div style="display: flex; row-gap: 16px; flex-direction: column;">
        <fluent-text>
            The toolbar attribute in the Drawer component enables the presence of a toolbar within the drawer. When the toolbar attribute is set to true, a toolbar section is displayed at the top of the drawer, allowing the inclusion of additional controls, actions, or information specific to the drawer's content.
            The toolbar provides a convenient space for placing buttons, icons, or other interactive elements that can enhance user interactions or provide quick access to specific features or functionalities within the drawer.
            By utilizing the toolbar attribute, you can enhance the usability and flexibility of the Drawer component by incorporating a dedicated section for toolbar-related content, promoting a clean and organized user interface.          
        </fluent-text>
        <div>
          <fluent-label>First Name</fluent-label>
          <fluent-text-input id="abc" type="text"></fluent-text-input>
        </div>
        <div>
          <fluent-label>Last Name</fluent-label>
          <fluent-text-input id="def" type="text" /></fluent-text-input>
        </div>
        <div>
          <fluent-label>Email</fluent-label>
          <fluent-text-input id="ghi" type="text" /></fluent-text-input>
        </div>
        <div>
          <fluent-label>Phone Number</fluent-label>
          <fluent-text-input id="jkl" type="text" /></fluent-text-input>
        </div>
      </div>
      <div slot="actions">
        <fluent-button tabindex="0" appearance="primary">Primary</fluent-button>
        <fluent-button tabindex="0" appearance="secondary">Secondary</fluent-button>
      </div>
    </fluent-drawer>
  </div>
`);
