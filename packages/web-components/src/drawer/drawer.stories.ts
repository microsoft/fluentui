import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Drawer as FluentDrawer } from './drawer.js';
import { DrawerPosition, DrawerSize } from './drawer.options.js';
import './define.js';

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

setTimeout(() => {
  const drawer = document.getElementById('drawer-push-content') as FluentDrawer;
  const container = document.getElementById('drawer-push-content-container') as FluentDrawer;

  drawer.addEventListener('openChanged', (event: any) => {
    if (drawer.open) {
      if (event.detail.position === DrawerPosition.left) {
        container.style.marginLeft = `${event.detail.controlSize}px`;
      } else {
        container.style.marginRight = `${event.detail.controlSize}px`;
      }
    } else if (!drawer.open) {
      container.style.margin = '0';
    }
  });
}, 3000); // 1000 milliseconds =

const toggleDrawer = (drawerID: string) => {
  console.log(drawerID);
  const drawer = document.getElementById(drawerID) as FluentDrawer;
  drawer.toggleDrawer();
};

const hideDrawer = (drawerID: string) => {
  const drawer = document.getElementById(drawerID) as FluentDrawer;
  drawer.closeDrawer();
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
      <div id="toggle-default" style="display: flex; justify-content: center; align-items: center; height: 100%;">
        <fluent-button appearance="primary" @click="${() =>
          toggleDrawer('drawer-default')}">Toggle Drawer</fluent-button>
      </div>
      <div>
        <fluent-drawer
          id="drawer-default"
          ?open="${x => x.open}"
          position="${x => x.position}"
          modal="${x => x.modal}"
          control-size="${x => x.controlSize}"
        >
        <div slot="buttons">
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

                <fluent-button @click=${() =>
                  hideDrawer(
                    'drawer-playground',
                  )} appearance="transparent" icon-only size="small" class="toolbar-button" tabindex="0"  aria-label="close">
                ${dismissed16Regular}
                </fluent-button>
            </div>
          </div>
        </div>
          <div slot="header">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <fluent-text font="base" size="500" weight="semibold" as="h1"><h1>Drawer Header</h1></fluent-text>
            </div>
          </div>
          <div style="display: flex; row-gap: 16px; flex-direction: column;">
            <fluent-text>
              The drawer gives users a quick entry point to configuration and information. It should be used when retaining context is beneficial to users. An overlay is optional depending on whether or not interacting with the backgroun d content is beneficial to the user's context/scenario. An overlay makes the drawer blocking and signifies that the users full attention is required when making configurations.
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
          <div slot="footer">
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
    width: undefined,
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
      div.docs-story > div:first-child,
      #docs-root .innerZoomElementWrapper > div > div {
        height: 38em;
        padding: 0;
      }
      #docs-root .innerZoomElementWrapper > div {
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
            <fluent-text font="base" size="500" weight="semibold" as="h1"><h1>Drawer Position Left</h1></fluent-text>
              <fluent-button class="toolbar-button" appearance="transparent" icon-only size="small" tabindex="0" aria-label="close">
                ${dismissed16Regular}
              </fluent-button>
            </div>
          </div>
          <div style="display: flex; row-gap: 16px; flex-direction: column;">
            <fluent-text font="base" size="300" weight="regular" as="p">
              <p>
                The drawer component offers flexible positioning options to suit your layout needs. By using the position attribute, you can easily place the drawer on either side of the screen. The attribute accepts values of type DrawerPosition, which includes two options: 'left' and 'right'. The default position of the Drawer is 'right'.
              </p>
            </fluent-text>
            <fluent-text font="monospace" size="300" weight="regular">
              <code>
                position="left"
              </code>
            </fluent-text>
          </div>
          </div>
          <div slot="footer">
            <fluent-button tabindex="0" appearance="primary">Primary</fluent-button>
            <fluent-button tabindex="0" appearance="secondary">Secondary</fluent-button>
          </div>
        </fluent-drawer>
      </div>
    </div>
  </div>
`);

export const DrawerPushContent = renderComponent(html<DrawerStoryArgs>`
    <div style="height: 38em; transform: scale(1); overflow-y: hidden; overflow-x: hidden;">
      <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
        <div id="drawer-push-content-container" style="display: flex; flex-direction: column; justify-content: flex-start; row-gap: 8px; align-items: flex-start; height: 100%;">
          <fluent-button appearance="primary" @click="${() =>
            toggleDrawer('drawer-push-content')}">Toggle Drawer</fluent-button>
        </div>
      </div>
    <div>
    <fluent-drawer id="drawer-push-content" control-size="small">
      <div slot="header">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <fluent-text font="base" size="500" weight="semibold" as="h1"><h1>Drawer Control Size Small</h1></fluent-text>
          <fluent-button
            class="toolbar-button"
            appearance="transparent"
            icon-only
            size="small"
            tabindex="0"
            aria-label="close"
          >
            ${dismissed16Regular}
          </fluent-button>
        </div>
      </div>
      <div style="display: flex; row-gap: 16px; flex-direction: column;">
        <fluent-text font="base" size="300" weight="regular" as="p">
          <p>
            The control-size attribute provides a way to adjust the drawer's dimensions to fit your design. This attribute takes values of type DrawerSize, which includes several predefined options like 'small', 'medium', and 'large'. To set the drawer to a compact size, simply specify control-size="small" in the component.</fluent-text>
          </p>
        </fluent-text>
        <fluent-text font="monospace" size="300" weight="regular">
          <code>
            control=size="small"
          </code>
        </fluent-text>
      </div>
      <div slot="footer">
        <fluent-button tabindex="0" appearance="primary">Primary</fluent-button>
        <fluent-button tabindex="0" appearance="secondary">Secondary</fluent-button>
      </div>
    </fluent-drawer>
    <fluent-drawer
          id="drawer-size--medium"
        >
          <div slot="header">
            <div style="display: flex; justify-content: space-between; align-items: center;">
            <fluent-text font="base" size="500" weight="semibold" as="h1"><h1>Drawer Control Size Medium</h1></fluent-text>
            <fluent-button class="toolbar-button" appearance="transparent" icon-only size="small" tabindex="0"aria-label="close">
                ${dismissed16Regular}
              </fluent-button>
            </div>
          </div>
          <div style="display: flex; row-gap: 16px; flex-direction: column;">
            <fluent-text font="base" size="300" weight="regular" as="p">
              <p>
                The control-size attribute provides a way to adjust the drawer's dimensions to fit your design. This attribute takes values of type DrawerSize, which includes several predefined options like 'small', 'medium', and 'large'. To set the drawer to a compact size, simply specify control-size="medium" in the component.</fluent-text>
              </p>
            </fluent-text>
            <fluent-text font="monospace" size="300" weight="regular">
              <code>
                control=size="medium"
              </code>
            </fluent-text>
          </div>
          <div slot="footer">
            <fluent-button tabindex="0" appearance="primary">Primary</fluent-button>
            <fluent-button tabindex="0" appearance="secondary">Secondary</fluent-button>
          </div>
        </fluent-drawer>
        <fluent-drawer
          id="drawer-size--large"
          control-size="large"
        >
          <div slot="header">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <fluent-text font="base" size="500" weight="semibold" as="h1"><h1>Drawer Control Size Large</h1></fluent-text>
              <fluent-button class="toolbar-button" appearance="transparent" icon-only size="small" tabindex="0"aria-label="close">
                ${dismissed16Regular}
              </fluent-button>
            </div>
          </div>

          <div style="display: flex; row-gap: 16px; flex-direction: column; margin-bottom: 12px;">
            <fluent-text font="base" size="300" weight="regular" as="p">
              <p>
                The control-size attribute provides a way to adjust the drawer's dimensions to fit your design. This attribute takes values of type DrawerSize, which includes several predefined options like 'small', 'medium', and 'large'. To set the drawer to a compact size, simply specify control-size="medium" in the component.</fluent-text>
              </p>
            </fluent-text>
            <fluent-text font="monospace" size="300" weight="regular">
              <code>
                control=size="medium"
              </code>
            </fluent-text>
          </div>
          <div slot="footer">
            <fluent-button tabindex="0" appearance="primary">Primary</fluent-button>
            <fluent-button tabindex="0" appearance="secondary">Secondary</fluent-button>
          </div>
        </fluent-drawer>
  </div>
`);

export const DrawerControlSize = renderComponent(html<DrawerStoryArgs>`
    <div style="height: 38em; transform: scale(1); overflow-y: hidden; overflow-x: hidden;">
      <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
        <div id="drawer-sizes" style="display: flex; flex-direction: column; justify-content: flex-start; row-gap: 8px; align-items: flex-start; height: 100%;">
          <fluent-button appearance="primary" @click="${() =>
            toggleDrawer('drawer-size--small', 'drawer-sizes')}">Small</fluent-button>
          <fluent-button appearance="primary" @click="${() =>
            toggleDrawer('drawer-size--medium', 'drawer-sizes')}">Medium</fluent-button>
          <fluent-button appearance="primary" @click="${() =>
            toggleDrawer('drawer-size--large', 'drawer-sizes')}">Large</fluent-button>
        </div>
      </div>
    <div>
    <fluent-drawer id="drawer-size--small" control-size="small">
      <div slot="header">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <fluent-text font="base" size="500" weight="semibold" as="h1"><h1>Drawer Control Size Small</h1></fluent-text>
          <fluent-button
            class="toolbar-button"
            appearance="transparent"
            icon-only
            size="small"
            tabindex="0"
            aria-label="close"
          >
            ${dismissed16Regular}
          </fluent-button>
        </div>
      </div>
      <div style="display: flex; row-gap: 16px; flex-direction: column;">
        <fluent-text font="base" size="300" weight="regular" as="p">
          <p>
            The control-size attribute provides a way to adjust the drawer's dimensions to fit your design. This attribute takes values of type DrawerSize, which includes several predefined options like 'small', 'medium', and 'large'. To set the drawer to a compact size, simply specify control-size="small" in the component.</fluent-text>
          </p>
        </fluent-text>
        <fluent-text font="monospace" size="300" weight="regular">
          <code>
            control=size="small"
          </code>
        </fluent-text>
      </div>
      <div slot="footer">
        <fluent-button tabindex="0" appearance="primary">Primary</fluent-button>
        <fluent-button tabindex="0" appearance="secondary">Secondary</fluent-button>
      </div>
    </fluent-drawer>
    <fluent-drawer
          id="drawer-size--medium"
        >
          <div slot="header">
            <div style="display: flex; justify-content: space-between; align-items: center;">
            <fluent-text font="base" size="500" weight="semibold" as="h1"><h1>Drawer Control Size Medium</h1></fluent-text>
            <fluent-button class="toolbar-button" appearance="transparent" icon-only size="small" tabindex="0"aria-label="close">
                ${dismissed16Regular}
              </fluent-button>
            </div>
          </div>
          <div style="display: flex; row-gap: 16px; flex-direction: column;">
            <fluent-text font="base" size="300" weight="regular" as="p">
              <p>
                The control-size attribute provides a way to adjust the drawer's dimensions to fit your design. This attribute takes values of type DrawerSize, which includes several predefined options like 'small', 'medium', and 'large'. To set the drawer to a compact size, simply specify control-size="medium" in the component.</fluent-text>
              </p>
            </fluent-text>
            <fluent-text font="monospace" size="300" weight="regular">
              <code>
                control=size="medium"
              </code>
            </fluent-text>
          </div>
          <div slot="footer">
            <fluent-button tabindex="0" appearance="primary">Primary</fluent-button>
            <fluent-button tabindex="0" appearance="secondary">Secondary</fluent-button>
          </div>
        </fluent-drawer>
        <fluent-drawer
          id="drawer-size--large"
          control-size="large"
        >
          <div slot="header">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <fluent-text font="base" size="500" weight="semibold" as="h1"><h1>Drawer Control Size Large</h1></fluent-text>
              <fluent-button class="toolbar-button" appearance="transparent" icon-only size="small" tabindex="0"aria-label="close">
                ${dismissed16Regular}
              </fluent-button>
            </div>
          </div>

          <div style="display: flex; row-gap: 16px; flex-direction: column; margin-bottom: 12px;">
            <fluent-text font="base" size="300" weight="regular" as="p">
              <p>
                The control-size attribute provides a way to adjust the drawer's dimensions to fit your design. This attribute takes values of type DrawerSize, which includes several predefined options like 'small', 'medium', and 'large'. To set the drawer to a compact size, simply specify control-size="medium" in the component.</fluent-text>
              </p>
            </fluent-text>
            <fluent-text font="monospace" size="300" weight="regular">
              <code>
                control=size="medium"
              </code>
            </fluent-text>
          </div>
          <div slot="footer">
            <fluent-button tabindex="0" appearance="primary">Primary</fluent-button>
            <fluent-button tabindex="0" appearance="secondary">Secondary</fluent-button>
          </div>
        </fluent-drawer>
  </div>
`);

export const DrawerWithCustomSize = renderComponent(html`
  <div style="height: 38em; transform: scale(1); overflow-y: hidden; overflow-x: hidden;">
    <fluent-drawer id="drawer-custom-size" open style="width: 400px;">
      <div slot="header">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <fluent-text font="base" size="500" weight="semibold" as="h1"><h1>Drawer Custom Size</h1></fluent-text>
          <fluent-button
            class="toolbar-button"
            appearance="transparent"
            icon-only
            size="small"
            tabindex="0"
            aria-label="close"
          >
            ${dismissed16Regular}
          </fluent-button>
        </div>
      </div>
      <div style="display: flex; row-gap: 16px; flex-direction: column;">
        <fluent-text>
          The drawer component offers flexibility in its design by allowing you to set a custom width. You can easily
          adjust the width of the drawer by modifying its CSS width property. This feature enables you to tailor the
          drawer's dimensions to better fit the content it holds or to align with your overall design scheme. Simply set
          the width property in your CSS to your desired value, and the drawer will adjust accordingly.
        </fluent-text>
        <fluent-text font="monospace" size="300" weight="regular">
          <code> style="width: 400px;" </code>
        </fluent-text>
      </div>
      <div slot="footer">
        <fluent-button tabindex="0" appearance="primary">Primary</fluent-button>
        <fluent-button tabindex="0" appearance="secondary">Secondary</fluent-button>
      </div>
    </fluent-drawer>
  </div>
`);

export const DrawerWithTopNav = renderComponent(html`
  <div style="height: 38em; transform: scale(1); overflow-y: hidden; overflow-x: hidden;">
    <fluent-drawer id="drawer-topnav" open>
      <div slot="buttons">
        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
          <div style="display: flex">
            <fluent-button
              appearance="transparent"
              icon-only
              size="small"
              class="toolbar-button"
              tabindex="0"
              aria-label="back"
            >
              ${arrowLeft16Regular}
            </fluent-button>
          </div>
          <div style="display: flex">
            <fluent-button
              appearance="transparent"
              icon-only
              size="small"
              class="toolbar-button"
              tabindex="0"
              aria-label="close"
            >
              ${arrowClockwise16Regular}
            </fluent-button>
            <fluent-button
              appearance="transparent"
              icon-only
              size="small"
              class="toolbar-button"
              tabindex="0"
              aria-label="close"
            >
              ${settings16Regular}
            </fluent-button>

            <fluent-button
              @click=${() => hideDrawer('drawer-playground')}
              appearance="transparent"
              icon-only
              size="small"
              class="toolbar-button"
              tabindex="0"
              aria-label="close"
            >
              ${dismissed16Regular}
            </fluent-button>
          </div>
        </div>
      </div>
      <div slot="header">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <fluent-text font="base" size="500" weight="semibold" as="h1"
            ><h1>Drawer with Top Navigation</h1></fluent-text
          >
        </div>
      </div>
      <div style="display: flex; row-gap: 16px; flex-direction: column;">
        <fluent-text size="300" font="base">
          The top navigation of the drawer component features an optional slot named "buttons," providing users with the
          flexibility to insert custom elements. Whether you want to add action buttons, icons, or other interactive
          elements, this slot allows you to extend the drawer's functionality and appearance to better suit your
          application's needs. Simply populate the "buttons" slot with your desired elements, and they will appear in
          the top navigation area of the drawer.
        </fluent-text>
        <fluent-text font="monospace" size="300" weight="regular">
          <code>slot="buttons"</code>
        </fluent-text>
      </div>
      <div slot="footer">
        <fluent-button tabindex="0" appearance="primary">Primary</fluent-button>
        <fluent-button tabindex="0" appearance="secondary">Secondary</fluent-button>
      </div>
    </fluent-drawer>
  </div>
`);

export const DrawerAsModal = renderComponent(html`
  <div style="height: 38em; transform: scale(1); overflow-y: hidden; overflow-x: hidden;">
    <fluent-drawer id="drawer-modal" modal open>
      <div slot="header">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <fluent-text font="base" size="500" weight="semibold" as="h1"><h1>Drawer as Modal</h1></fluent-text>
          <fluent-button
            class="toolbar-button"
            appearance="transparent"
            icon-only
            size="small"
            tabindex="0"
            aria-label="close"
          >
            ${dismissed16Regular}
          </fluent-button>
        </div>
      </div>
      <div style="display: flex; row-gap: 16px; flex-direction: column;">
        <fluent-text>
          Rendering the Drawer as a modal enables a blocking overlay that signifies that the users full attention is
          required when making configurations.
        </fluent-text>
        <fluent-text font="monospace" size="300" weight="regular">
          <code>modal</code>
        </fluent-text>
      </div>
      <div slot="footer">
        <fluent-button tabindex="0" appearance="primary">Primary</fluent-button>
        <fluent-button tabindex="0" appearance="secondary">Secondary</fluent-button>
      </div>
    </fluent-drawer>
  </div>
`);

export const DrawerWithOverflowContent = renderComponent(html`
    <div style="height: 38em; transform: scale(1); overflow-y: hidden; overflow-x: hidden;">
        <fluent-drawer
          id="drawer-modal"
          open
        >
          <div slot="header">
            <div style="display: flex; justify-content: space-between; align-items: center;">
            <fluent-text font="base" size="500" weight="semibold" as="h1"><h1>Drawer with Overflow Content</h1></fluent-text>
              <fluent-button class="toolbar-button" appearance="transparent" icon-only size="small" tabindex="0"aria-label="close">
                ${dismissed16Regular}
              </fluent-button>
            </div>
          </div>
          <div style="display: flex; row-gap: 16px; flex-direction: column;">
            <fluent-text>
              When the content section of the drawer contains more information than can fit within its designated area, a scrollbar automatically appears to facilitate easy navigation through the overflowing content. Additionally, a dynamic border is added to the footer of the drawer. This border serves as a visual separator between the content and footer sections, enhancing the user experience by clearly delineating these two areas.
             </fluent-text>
            <fluent-text size="400" weight="bold" as="h2"><h2>Personal Info</h2></fluent-text>
            <div>
              <fluent-label>First Name</fluent-label>
              <fluent-text-input id="abc" type="text"></fluent-text-input>
            </div>
            <div>
              <fluent-label>Last Name</fluent-label>
              <fluent-text-input id="def" type="text" /></fluent-text-input>
            </div>
            <fluent-text size="400" weight="bold" as="h2"><h2>Contact Details</h2></fluent-text>
            <div>
              <fluent-label>Email</fluent-label>
              <fluent-text-input id="ghi" type="text" /></fluent-text-input>
            </div>
            <div>
              <fluent-label>Phone Number</fluent-label>
              <fluent-text-input id="jkl" type="text" /></fluent-text-input>
            </div>
            <fluent-text size="400" weight="bold" as="h2"><h2>Account Settings</h2></fluent-text>
            <div>
              <fluent-label>Username</fluent-label>
              <fluent-text-input id="ghi" type="text" /></fluent-text-input>
            </div>
            <div>
              <fluent-label>Password</fluent-label>
              <fluent-text-input id="jkl" type="password" /></fluent-text-input>
            </div>
          </div>
          <div slot="footer">
            <fluent-button tabindex="0" appearance="primary">Primary</fluent-button>
            <fluent-button tabindex="0" appearance="secondary">Secondary</fluent-button>
          </div>
        </fluent-drawer>
      </div>
`);
