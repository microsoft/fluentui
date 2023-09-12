import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Drawer as FluentDrawer } from './drawer.js';
import { DrawerPosition, DrawerSize } from './drawer.options.js';
import './define.js';
import { colorNeutralStroke1 } from '../theme/design-tokens.js';

type DrawerStoryArgs = Args & FluentDrawer;
type DrawerStoryMeta = Meta<DrawerStoryArgs>;

const dismissed20Regular = html`<svg
  fill="currentColor"
  aria-hidden="true"
  width="20"
  height="20"
  viewBox="0 0 20 20"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="m4.09 4.22.06-.07a.5.5 0 0 1 .63-.06l.07.06L10 9.29l5.15-5.14a.5.5 0 0 1 .63-.06l.07.06c.18.17.2.44.06.63l-.06.07L10.71 10l5.14 5.15c.18.17.2.44.06.63l-.06.07a.5.5 0 0 1-.63.06l-.07-.06L10 10.71l-5.15 5.14a.5.5 0 0 1-.63.06l-.07-.06a.5.5 0 0 1-.06-.63l.06-.07L9.29 10 4.15 4.85a.5.5 0 0 1-.06-.63l.06-.07-.06.07Z"
    fill="currentColor"
  ></path>
</svg>`;

const arrowLeft20Regular = html`<svg
  fill="currentColor"
  aria-hidden="true"
  width="20"
  height="20"
  viewBox="0 0 20 20"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M9.16 16.87a.5.5 0 1 0 .67-.74L3.67 10.5H17.5a.5.5 0 0 0 0-1H3.67l6.16-5.63a.5.5 0 0 0-.67-.74L2.24 9.44a.75.75 0 0 0 0 1.11l6.92 6.32Z"
    fill="currentColor"
  ></path>
</svg>`;

const arrowClockwise20Regular = html`<svg
  fill="currentColor"
  aria-hidden="true"
  width="20"
  height="20"
  viewBox="0 0 20 20"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M3.07 9.05a7 7 0 0 1 12.55-3.22l.13.17H12.5a.5.5 0 1 0 0 1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-1 0v2.2a8 8 0 1 0 1.99 4.77.5.5 0 0 0-1 .08 7 7 0 1 1-13.92-.5Z"
    fill="currentColor"
  ></path>
</svg>`;

const settings20Regular = html`<svg
  fill="currentColor"
  aria-hidden="true"
  width="20"
  height="20"
  viewBox="0 0 20 20"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M1.91 7.38A8.5 8.5 0 0 1 3.7 4.3a.5.5 0 0 1 .54-.13l1.92.68a1 1 0 0 0 1.32-.76l.36-2a.5.5 0 0 1 .4-.4 8.53 8.53 0 0 1 3.55 0c.2.04.35.2.38.4l.37 2a1 1 0 0 0 1.32.76l1.92-.68a.5.5 0 0 1 .54.13 8.5 8.5 0 0 1 1.78 3.08c.06.2 0 .4-.15.54l-1.56 1.32a1 1 0 0 0 0 1.52l1.56 1.32a.5.5 0 0 1 .15.54 8.5 8.5 0 0 1-1.78 3.08.5.5 0 0 1-.54.13l-1.92-.68a1 1 0 0 0-1.32.76l-.37 2a.5.5 0 0 1-.38.4 8.53 8.53 0 0 1-3.56 0 .5.5 0 0 1-.39-.4l-.36-2a1 1 0 0 0-1.32-.76l-1.92.68a.5.5 0 0 1-.54-.13 8.5 8.5 0 0 1-1.78-3.08.5.5 0 0 1 .15-.54l1.56-1.32a1 1 0 0 0 0-1.52L2.06 7.92a.5.5 0 0 1-.15-.54Zm1.06 0 1.3 1.1a2 2 0 0 1 0 3.04l-1.3 1.1c.3.79.72 1.51 1.25 2.16l1.6-.58a2 2 0 0 1 2.63 1.53l.3 1.67a7.56 7.56 0 0 0 2.5 0l.3-1.67a2 2 0 0 1 2.64-1.53l1.6.58a7.5 7.5 0 0 0 1.24-2.16l-1.3-1.1a2 2 0 0 1 0-3.04l1.3-1.1a7.5 7.5 0 0 0-1.25-2.16l-1.6.58a2 2 0 0 1-2.63-1.53l-.3-1.67a7.55 7.55 0 0 0-2.5 0l-.3 1.67A2 2 0 0 1 5.81 5.8l-1.6-.58a7.5 7.5 0 0 0-1.24 2.16ZM7.5 10a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Zm1 0a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z"
    fill="currentColor"
  ></path>
</svg>`;

setTimeout(() => {
  const drawer = document.getElementById('drawer-push') as FluentDrawer;
  const container = document.getElementById('dummy-content-container') as FluentDrawer;

  drawer.addEventListener('openChanged', (event: any) => {
    if (drawer.open) {
      if (event.detail.position === DrawerPosition.left) {
        container.style.transition = `transform 200ms cubic-bezier(0.7,0,1,0.5)`;
        container.style.transform = `translateX(${event.detail.size}px)`;
      } else {
        container.style.transition = `transform 200ms cubic-bezier(0.7,0,1,0.5)`;
        container.style.transform = `translateX(-${event.detail.size}px)`;
      }
    } else if (!drawer.open) {
      container.style.transition = `transform 200ms cubic-bezier(0.1,0.9,0.2,1)`;
      container.style.transform = 'translateX(0)';
    }
  });
}, 3000);

const toggleDrawer = (drawerID: string, containerID?: string) => {
  const drawer = document.getElementById(drawerID) as FluentDrawer;
  if (containerID) {
    console.log(containerID);
    const container = document.querySelector(`#${containerID}`);
    const drawers = container!.querySelectorAll(`fluent-drawer:not(#${drawerID})`);
    drawers.forEach(drawerElement => {
      const drawer = drawerElement as FluentDrawer;
      if (drawer.open) {
        drawer.closeDrawer();
      }
    });
  }
  drawer.toggleDrawer();
};

const hideDrawer = (drawerID: string) => {
  const drawer = document.getElementById(drawerID) as FluentDrawer;
  drawer.closeDrawer();
};

const storyTemplate = html<DrawerStoryArgs>`
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
     .sbdocs-content {
        max-width: 1200px;
      }
    </style>
    <div style="height: 38em; transform: scale(1); overflow-y: hidden; overflow-x: hidden;">
      <div id="toggle-default" style="display: flex; justify-content: flex-start; padding: 12px;">
        <fluent-button appearance="primary" @click="${() =>
          toggleDrawer('drawer-default')}">Toggle Drawer</fluent-button>
      </div>
      <div>
        <fluent-drawer
          id="drawer-default"
          ?open="${x => x.open}"
          position="${x => x.position}"
          modal="${x => x.modal}"
          size="${x => x.size}"
        >
          <div slot="navigation">
            <fluent-button appearance="transparent" icon-only size="medium" size tabindex="0" aria-label="back">
            ${arrowLeft20Regular}
            </fluent-button>
            <fluent-button appearance="transparent" icon-only size="medium" size tabindex="0"  aria-label="close">
              ${arrowClockwise20Regular}
            </fluent-button>
            <fluent-button appearance="transparent" icon-only size="medium" size tabindex="0"  aria-label="close">
              ${settings20Regular}
            </fluent-button>

            <fluent-button @click=${() =>
              hideDrawer(
                'drawer-default',
              )} appearance="transparent" icon-only size="medium" size tabindex="0"  aria-label="close">
            ${dismissed20Regular}
            </fluent-button>
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
    position: DrawerPosition.right,
    width: undefined,
    open: false,
    trapFocus: false,
    modal: false,
    size: 'medium',
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
    size: {
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

export const Position = renderComponent(html<DrawerStoryArgs>`
  <div style="height: 38em; transform: scale(1); overflow-y: hidden; overflow-x: hidden;">
    <div>
      <fluent-drawer id="drawer-left" position="left" open style="width: 350px;">
        <div slot="header">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <fluent-text font="base" size="500" weight="semibold" as="h1"><h1>Drawer Position Left</h1></fluent-text>
            <fluent-button size appearance="transparent" icon-only size="medium" tabindex="0" aria-label="close">
              ${dismissed20Regular}
            </fluent-button>
          </div>
        </div>
        <div style="display: flex; row-gap: 16px; flex-direction: column;">
          <fluent-text font="base" size="300" weight="regular" as="p">
            <p>
              The drawer component offers flexible positioning options to suit your layout needs. By using the position
              attribute, you can easily place the drawer on either side of the screen. The attribute accepts values of
              type DrawerPosition, which includes two options: 'left' and 'right'. The default position of the Drawer is
              'right'.
            </p>
          </fluent-text>
          <fluent-text font="monospace" size="300" weight="regular">
            <code> position="left" </code>
          </fluent-text>
        </div>
      </fluent-drawer>
      <fluent-drawer id="drawer-right" open style="width: 350px;">
        <div slot="header">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <fluent-text font="base" size="500" weight="semibold" as="h1"><h1>Drawer Position Right</h1></fluent-text>
            <fluent-button size appearance="transparent" icon-only size="medium" tabindex="0" aria-label="close">
              ${dismissed20Regular}
            </fluent-button>
          </div>
        </div>
        <div style="display: flex; row-gap: 16px; flex-direction: column;">
          <fluent-text font="base" size="300" weight="regular" as="p">
            <p>
              The drawer component offers flexible positioning options to suit your layout needs. By using the position
              attribute, you can easily place the drawer on either side of the screen. The attribute accepts values of
              type DrawerPosition, which includes two options: 'left' and 'right'. The default position of the Drawer is
              'right'.
            </p>
          </fluent-text>
        </div>
      </fluent-drawer>
    </div>
  </div>
`);

export const PushContent = renderComponent(html<DrawerStoryArgs>`
  <style>
    .dummy-content-container {
      padding: 4px;
      width: 300px;
      height: 100%;
      display: flex;
      justify-self: flex-end;
      justify-content: center;
      position: relative;
      align-items: center;
    }
    .dummy-content {
      border: 2px solid var(--colorNeutralStroke1);
      display: grid;
      grid-template-rows: min-content auto min-content;
      row-gap: 12px;
      padding: 12px;
      height: fit-content;
      box-sizing: border-box;
      margin-right: 16px;
    }
  </style>
  <div style="height: 38em; transform: scale(1); overflow-y: hidden; overflow-x: hidden; display: grid;">
    <div class="dummy-content-container" id="dummy-content-container">
      <div class="dummy-content">
        <fluent-text font="base" size="500" weight="bold" as="h1" block>
          <h1>Content to be Pushed</h1>
        </fluent-text>
        <fluent-text font="base" size="300" weight="regular" as="p" block>
          <p>Users can utilize the <code>openChanged</code> event to dynamically adapt your application's layout.</p>
        </fluent-text>
        <div style="flex-shrink: 0;">
          <fluent-button appearance="primary" @click="${() => toggleDrawer('drawer-push')}"
            >Toggle Drawer</fluent-button
          >
        </div>
      </div>
    </div>
    <fluent-drawer id="drawer-push" style="width: 360px;">
      <div slot="header">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <fluent-text font="base" size="500" weight="semibold" as="h1"><h1>Drawer Push Content</h1></fluent-text>
          <fluent-button
            size
            appearance="transparent"
            icon-only
            tabindex="0"
            aria-label="close"
            @click="${() => hideDrawer('drawer-push')}"
          >
            ${dismissed20Regular}
          </fluent-button>
        </div>
      </div>
      <div style="display: flex; row-gap: 16px; flex-direction: column;">
        <fluent-text font="base" size="300" weight="regular" as="p">
          <p>
            The openChanged event details provide critical information about the drawer's current state, including
            whether it is open or closed, its position (either left or right of the screen), and its width.
          </p>
        </fluent-text>
      </div>
    </fluent-drawer>
  </div>
`);

export const Size = renderComponent(html<DrawerStoryArgs>`
<div style="height: 38em; transform: scale(1); overflow-y: hidden; overflow-x: hidden;">
  <div style="display: flex; justify-content: flex-start; align-items: flex-start; height: 100%; padding: 15px;">
    <div style="display: flex; flex-direction: column; justify-content: flex-start; row-gap: 8px; align-items: flex-start; height: 100%;">
      <fluent-button appearance="primary" @click="${() =>
        toggleDrawer('drawer-size--small', 'drawer-sizes-container')}">Small</fluent-button>
      <fluent-button appearance="primary" @click="${() =>
        toggleDrawer('drawer-size--medium', 'drawer-sizes-container')}">Medium</fluent-button>
      <fluent-button appearance="primary" @click="${() =>
        toggleDrawer('drawer-size--large', 'drawer-sizes-container')}">Large</fluent-button>
    </div>
  </div>
  <div id="drawer-sizes-container">
    <fluent-drawer id="drawer-size--small" size="small">
      <div slot="header">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <fluent-text font="base" size="500" weight="semibold" as="h1"><h1>Drawer Control Size Small</h1></fluent-text>
          <fluent-button
            size
            appearance="transparent"
            icon-only
            size="medium"
            tabindex="0"
            aria-label="close"
            @click="${() => hideDrawer('drawer-size--small')}"
          >
            ${dismissed20Regular}
          </fluent-button>
        </div>
      </div>
      <div style="display: flex; row-gap: 16px; flex-direction: column;">
        <fluent-text font="base" size="300" weight="regular" as="p">
          <p>
            The size attribute provides a way to adjust the drawer's dimensions to fit your design. This attribute takes values of type DrawerSize, which includes several predefined options like 'small', 'medium', and 'large'. To set the drawer to a compact size, simply specify size="small" in the component.</fluent-text>
          </p>
        </fluent-text>
        <fluent-text font="monospace" size="300" weight="regular">
          <code>
            size="small"
          </code>
        </fluent-text>
      </div>
      <div slot="footer">
        <fluent-button tabindex="0" appearance="primary">Primary</fluent-button>
        <fluent-button tabindex="0" appearance="secondary">Secondary</fluent-button>
      </div>
    </fluent-drawer>
    <fluent-drawer id="drawer-size--medium">
      <div slot="header">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <fluent-text font="base" size="500" weight="semibold" as="h1"><h1>Drawer Control Size Medium</h1></fluent-text>
          <fluent-button
            size
            appearance="transparent"
            icon-only
            size="medium"
            tabindex="0"
            aria-label="close"
            @click="${() => hideDrawer('drawer-size--medium')}"
          >
              ${dismissed20Regular}
          </fluent-button>
        </div>
      </div>
      <div style="display: flex; row-gap: 16px; flex-direction: column;">
        <fluent-text font="base" size="300" weight="regular" as="p">
          <p>
            The size attribute provides a way to adjust the drawer's dimensions to fit your design. This attribute takes values of type DrawerSize, which includes several predefined options like 'small', 'medium', and 'large'. To set the drawer to a compact size, simply specify size="medium" in the component.</fluent-text>
          </p>
        </fluent-text>
        <fluent-text font="monospace" size="300" weight="regular">
          <code>
            size="medium"
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
      size="large"
    >
      <div slot="header">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <fluent-text font="base" size="500" weight="semibold" as="h1"><h1>Drawer Control Size Large</h1></fluent-text>
          <fluent-button
          size
          appearance="transparent"
          icon-only
          size="medium"
          tabindex="0"
          aria-label="close"
          @click="${() => hideDrawer('drawer-size--large')}"
          >
            ${dismissed20Regular}
          </fluent-button>
        </div>
      </div>
      <div style="display: flex; row-gap: 16px; flex-direction: column; margin-bottom: 12px;">
        <fluent-text font="base" size="300" weight="regular" as="p">
          <p>
            The size attribute provides a way to adjust the drawer's dimensions to fit your design. This attribute takes values of type DrawerSize, which includes several predefined options like 'small', 'medium', and 'large'. To set the drawer to a compact size, simply specify size="medium" in the component.</fluent-text>
          </p>
        </fluent-text>
        <fluent-text font="monospace" size="300" weight="regular">
          <code>
            size="medium"
          </code>
        </fluent-text>
      </div>
      <div slot="footer">
        <fluent-button tabindex="0" appearance="primary">Primary</fluent-button>
        <fluent-button tabindex="0" appearance="secondary">Secondary</fluent-button>
      </div>
    </fluent-drawer>
  </div>
</div>
`);

export const CustomSize = renderComponent(html`
  <div style="height: 38em; transform: scale(1); overflow-y: hidden; overflow-x: hidden;">
    <fluent-drawer id="drawer-custom-size" open style="width: 400px;">
      <div slot="header">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <fluent-text font="base" size="500" weight="semibold" as="h1"><h1>Drawer Custom Size</h1></fluent-text>
          <fluent-button size appearance="transparent" icon-only size="medium" tabindex="0" aria-label="close">
            ${dismissed20Regular}
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

export const TopNavigation = renderComponent(html`
  <div style="height: 38em; transform: scale(1); overflow-y: hidden; overflow-x: hidden;">
    <fluent-drawer id="drawer-top-navigation" open>
      <div slot="navigation">
        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
          <div style="display: flex">
            <fluent-button appearance="transparent" icon-only size="medium" size tabindex="0" aria-label="back">
              ${arrowLeft20Regular}
            </fluent-button>
          </div>
          <div style="display: flex">
            <fluent-button appearance="transparent" icon-only size="medium" size tabindex="0" aria-label="close">
              ${arrowClockwise20Regular}
            </fluent-button>
            <fluent-button appearance="transparent" icon-only size="medium" size tabindex="0" aria-label="close">
              ${settings20Regular}
            </fluent-button>

            <fluent-button appearance="transparent" icon-only size="medium" size tabindex="0" aria-label="close">
              ${dismissed20Regular}
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
          <code>slot="navigation"</code>
        </fluent-text>
      </div>
      <div slot="footer">
        <fluent-button tabindex="0" appearance="primary">Primary</fluent-button>
        <fluent-button tabindex="0" appearance="secondary">Secondary</fluent-button>
      </div>
    </fluent-drawer>
  </div>
`);

export const Modal = renderComponent(html`
  <div style="height: 38em; transform: scale(1); overflow-y: hidden; overflow-x: hidden;">
    <div style="display: flex; padding: 15px;">
      <div
        style="display: flex; flex-direction: column; justify-content: flex-start; row-gap: 8px; align-items: flex-start; height: 100%;"
      >
        <fluent-button appearance="primary" @click="${() => toggleDrawer('drawer-modal')}"
          >Toggle Modal Drawer</fluent-button
        >
      </div>
    </div>
    <fluent-drawer id="drawer-modal" modal>
      <div slot="header">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <fluent-text font="base" size="500" weight="semibold" as="h1"><h1>Drawer as Modal</h1></fluent-text>
          <fluent-button
            appearance="transparent"
            icon-only
            size="medium"
            tabindex="0"
            aria-label="close"
            @click="${() => hideDrawer('drawer-modal')}"
          >
            ${dismissed20Regular}
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
        <fluent-button
          appearance="primary"
          @click="${() => hideDrawer('drawer-modal')}"
          tabindex="0"
          appearance="secondary"
          >Finish</fluent-button
        >
      </div>
    </fluent-drawer>
  </div>
`);

export const OverflowContent = renderComponent(html`
    <div style="height: 38em; transform: scale(1); overflow-y: hidden; overflow-x: hidden;">
        <fluent-drawer
          id="drawer-modal"
          open
        >
          <div slot="header">
            <div style="display: flex; justify-content: space-between; align-items: center;">
            <fluent-text font="base" size="500" weight="semibold" as="h1"><h1>Drawer with Overflow Content</h1></fluent-text>
              <fluent-button size appearance="transparent" icon-only size="medium" tabindex="0"aria-label="close">
                ${dismissed20Regular}
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
