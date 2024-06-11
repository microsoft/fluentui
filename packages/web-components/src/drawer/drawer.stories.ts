import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import { RadioGroup } from '../radio-group/radio-group.js';
import type { Drawer as FluentDrawer } from './drawer.js';
import { DrawerPosition, DrawerSize, DrawerType } from './drawer.options.js';
import './define.js';
import '../drawer-body/define.js';

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

const toggleDrawer = (drawerID: string, containerID?: string) => {
  const drawer = document.getElementById(drawerID) as FluentDrawer;
  if (containerID) {
    const container = document.querySelector(`#${containerID}`);
    const drawers = container!.querySelectorAll(`fluent-drawer:not(#${drawerID})`);
    drawers.forEach(drawerElement => {
      const drawer = drawerElement as FluentDrawer;
      if (drawer.dialog.open) {
        drawer.hide();
      }
    });
  }
  if (drawer.dialog.open) {
    drawer.hide();
  } else {
    drawer.show();
  }
};

const toggleSelectedDrawer = (radioGroupId: string) => {
  const radioGroup = document.getElementById(radioGroupId) as RadioGroup;
  const idSubString = radioGroup.value;
  const drawerToOpen = document.querySelector(`#drawer-${idSubString}`) as FluentDrawer;
  const drawersToClose = document.querySelectorAll(`fluent-drawer:not(#drawer-${idSubString})`);
  if (drawerToOpen.dialog.open) {
    drawerToOpen.hide();
  } else {
    drawerToOpen.show();
  }
  drawersToClose.forEach(d => {
    const drawer = d as FluentDrawer;
    if (drawer.dialog.open) {
      drawer.hide();
    }
  });
};

const hideDrawer = (drawerID: string) => {
  const drawer = document.getElementById(drawerID) as FluentDrawer;
  if (drawer.dialog.open) {
    drawer.hide();
  }
};

setTimeout(() => {
  const input = document.getElementById('custom-size-input') as FluentDrawer;
  const drawer = document.getElementById('drawer-width-custom') as FluentDrawer;
  input.addEventListener('input', (e: any) => {
    drawer.style.setProperty('--drawer-width', `${e.target.value}px`);
  });
}, 2000);

const storyTemplate = html<DrawerStoryArgs>`
  <div class="full-height">
    <style>
      div.docs-story > div:first-child,
      #docs-root .innerZoomElementWrapper > div > div {
        height: 30em;
        overflow: hidden;
        padding: 0;
      }
      #docs-root .innerZoomElementWrapper > div {
        padding: 0;
      }
      .full-height,
      .innerZoomElementWrapper > div > div > div {
        height: 100%;
      }
      .justify--space-betweendocs-content {
        max-width: 1200px;
      }
      .story-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
      }
      .grid {
        display: grid;
      }
      .flex {
        display: flex;
      }
      .column {
        flex-direction: column;
      }
      .justify--center {
        justify-content: center;
      }
      .justify--space-between {
        justify-content: space-between;
      }
      .gap--16 {
        gap: 16px;
      }
      .col-gap--8 {
        column-gap: 8px;
      }
      .padding--16 {
        padding: 16px;
      }
      .width-400 {
        width: 400px;
      }
    </style>
    <div class="flex justify--space-between full-height">
      <fluent-drawer id="drawer-default-start" position="start" size="${x => x.size}" type="${x => x.type}">
        <fluent-drawer-body>
          <span slot="title"> Drawer Header</span>
          <div>
            <fluent-text>
              The drawer gives users a quick entry point to configuration and information. It should be used when
              retaining context is beneficial to users. An overlay is optional depending on whether or not interacting
              with the backgroun d content is beneficial to the user's context/scenario. An overlay makes the drawer
              blocking and signifies that the users full attention is required when making configurations.
            </fluent-text>
            <div>
              <fluent-radio-group>
                <fluent-label slot="label">Please select an option</fluent-label>
                <fluent-radio value="1">Option 1</fluent-radio>
                <fluent-radio value="2">Option 2</fluent-radio>
                <fluent-radio value="3">Option 3</fluent-radio>
              </fluent-radio-group>
            </div>
          </div>
          <div slot="footer" class="flex gap--16">
            <fluent-button appearance="primary" @click="${() => hideDrawer('drawer-default-start')}"
              >Close</fluent-button
            >
            <fluent-button appearance="secondary">Do Something</fluent-button>
          </div>
        </fluent-drawer-body>
      </fluent-drawer>
      <div class="gap--16 column flex justify--center padding--16 width-400">
        <fluent-text weight="bold" size="400" as="h3"><h3>Drawer</h3></fluent-text>
        <fluent-text font="base" size="300" weight="regular" as="p">
          <p>
            The Drawer gives users a quick entry point to configuration and information. It should be used when
            retaining context is beneficial to users.
          </p>
        </fluent-text>
        <fluent-text font="monospace" size="300" weight="regular">
          <code>fluent-drawer</code>
        </fluent-text>
        <fluent-radio-group id="drawer-radio-default" orientation="horizontal">
          <fluent-label weight="semibold">Position</fluent-label>
          <fluent-radio value="default-start" checked>Start</fluent-radio>
          <fluent-radio value="default-end">End</fluent-radio>
        </fluent-radio-group>
        <fluent-button appearance="primary" @click="${() => toggleSelectedDrawer('drawer-radio-default')}"
          >Toggle Drawer</fluent-button
        >
      </div>
      <fluent-drawer id="drawer-default-end" position="end" size="${x => x.size}" type="${x => x.type}">
        <fluent-drawer-body>
          <span slot="title"> Drawer Header</span>

          <div>
            <fluent-text>
              The drawer gives users a quick entry point to configuration and information. It should be used when
              retaining context is beneficial to users. An overlay is optional depending on whether or not interacting
              with the backgroun d content is beneficial to the user's context/scenario. An overlay makes the drawer
              blocking and signifies that the users full attention is required when making configurations.
            </fluent-text>
            <div>
              <fluent-radio-group>
                <fluent-label slot="label">Please select an option</fluent-label>
                <fluent-radio value="1">Option 1</fluent-radio>
                <fluent-radio value="2">Option 2</fluent-radio>
                <fluent-radio value="3">Option 3</fluent-radio>
              </fluent-radio-group>
            </div>
          </div>
          <div slot="footer" class="flex gap--16">
            <fluent-button appearance="primary" @click="${() => hideDrawer('drawer-default-end')}">Close</fluent-button>
            <fluent-button appearance="secondary">Do Something</fluent-button>
          </div>
        </fluent-drawer-body>
      </fluent-drawer>
    </div>
  </div>
`;

export default {
  title: 'Components/Drawer',
  args: {
    type: DrawerType.modal,
    size: DrawerSize.medium,
  },
  argTypes: {
    position: {
      options: Object.values(DrawerPosition),
      table: {
        type: {
          summary: 'Sets the position of drawer',
        },
        defaultValue: {
          summary: DrawerPosition.start,
        },
      },
    },
    type: {
      options: Object.values(DrawerType),
      control: {
        type: 'select',
      },
      table: {
        type: {
          summary: 'Sets the modal type of the drawer',
        },
        defaultValue: {
          summary: DrawerType.modal,
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

export const Modal = renderComponent(html<DrawerStoryArgs>`
  <div class="flex justify--center full-height">
    <div>
      <fluent-drawer id="drawer-modal" type="modal">
        <fluent-drawer-body>
          <span slot="title"> Drawer Header</span>
          <fluent-button
            slot="close"
            appearance="transparent"
            icon-only
            aria-label="close"
            @click="${() => hideDrawer('drawer-modal')}"
          >
            ${dismissed20Regular}
          </fluent-button>
          <div>
            <fluent-text font="base" size="300" weight="regular" as="p">
              <p>
                When a modal dialog is open, the rest of the page is dimmed out and cannot be interacted with. The tab
                sequence is kept within the dialog and moving the focus outside the dialog will imply closing it. This
                is the default type of the component.
              </p>
            </fluent-text>
            <fluent-text font="monospace" size="300" weight="regular" as="p">
              <code>type="modal"</code>
            </fluent-text>
          </div>
          <div slot="footer" class="flex gap--16">
            <fluent-button appearance="primary" @click="${() => hideDrawer('drawer-default-start')}"
              >Close</fluent-button
            >
            <fluent-button appearance="secondary">Do Something</fluent-button>
          </div>
        </fluent-drawer-body>
      </fluent-drawer>
    </div>
    <div class="gap--16 column flex justify--center padding--16 width-400">
      <fluent-text weight="bold" size="400" as="h3"><h3>Modal</h3></fluent-text>
      <fluent-text weight="regular" size="300" as="p" block="true">
        <p>
          When a modal dialog is open, the rest of the page is dimmed out and cannot be interacted with. The tab
          sequence is kept within the dialog and moving the focus outside the dialog will imply closing it. This is the
          default type of the component.
        </p>
      </fluent-text>
      <br />
      <br />
      <fluent-text font="monospace" size="300" weight="regular" as="p" block="true">
        <code>type="modal"</code>
      </fluent-text>
      <fluent-button appearance="primary" @click="${() => toggleDrawer('drawer-modal')}">Toggle Drawer</fluent-button>
    </div>
  </div>
`);

export const NonModal = renderComponent(html<DrawerStoryArgs>`
  <div class="flex justify--center full-height">
    <div>
      <fluent-drawer id="drawer-nonmodal" type="non-modal">
        <fluent-drawer-body>
          <span slot="title">Non modal</span>
          <fluent-button
            slot="close"
            appearance="transparent"
            icon-only
            aria-label="close"
            @click="${() => hideDrawer('drawer-nonmodal')}"
          >
            ${dismissed20Regular}
          </fluent-button>
          <fluent-text font="base" size="300" weight="regular" as="p" block="true">
            <p>
              When a non-modal dialog is open, the rest of the page is not dimmed out and users can interact with the
              rest of the page. This also implies that the tab focus can move outside the dialog when it reaches the
              last focusable element.
            </p>
          </fluent-text>
          <br />
          <br />
          <fluent-text font="monospace" size="300" weight="regular" as="p" block="true">
            <code>type="non-modal"</code>
          </fluent-text>
        </fluent-drawer-body>
      </fluent-drawer>
    </div>
    <div class="gap--16 column flex justify--center padding--16 width-400">
      <fluent-text weight="bold" size="400" as="h3"><h3>Non Modal</h3></fluent-text>
      <fluent-text weight="regular" size="300" as="p">
        <p>
          When a non-modal dialog is open, the rest of the page is not dimmed out and users can interact with the rest
          of the page. This also implies that the tab focus can move outside the dialog when it reaches the last
          focusable element.
        </p>
      </fluent-text>
      <fluent-text font="monospace" size="300" weight="regular" as="p">
        <code>type="non-modal"</code>
      </fluent-text>
      <fluent-button appearance="primary" @click="${() => toggleDrawer('drawer-nonmodal')}"
        >Toggle Drawer</fluent-button
      >
    </div>
  </div>
`);

export const Inline = renderComponent(html<DrawerStoryArgs>`
  <div class="flex justify--space-between full-height">
    <fluent-drawer position="start" size="small" id="drawer-inline-start" type="inline">
      <fluent-drawer-body>
        <span slot="title">Drawer Inline</span>
        <fluent-button
          slot="close"
          appearance="transparent"
          icon-only
          aria-label="close"
          @click="${() => hideDrawer('drawer-inline-start')}"
        >
          ${dismissed20Regular}
        </fluent-button>
        <fluent-text font="base" size="300" weight="regular" as="p">
          <p>
            An inline Drawer is often used for navigation that is not dismissible. As it is on the same level as the
            main surface, users can still interact with other UI elements. This could be useful for swapping between
            different items in the main surface.
          </p>
        </fluent-text>
        <br />
        <br />
        <fluent-text font="monospace" size="300" weight="regular" as="p">
          <code>type="inline"</code>
        </fluent-text>
      </fluent-drawer-body>
    </fluent-drawer>
    <div class="gap--16 column flex justify--center padding--16 width-400">
      <fluent-text weight="bold" size="400" as="h3"><h3>Inline</h3></fluent-text>
      <fluent-text font="base" size="300" weight="regular" as="p">
        <p>
          An inline Drawer is often used for navigation that is not dismissible. As it is on the same level as the main
          surface, users can still interact with other UI elements. This could be useful for swapping between different
          items in the main surface.
        </p>
      </fluent-text>
      <br />
      <br />
      <fluent-text font="monospace" size="300" weight="regular" as="p">
        <code>type="inline"</code>
      </fluent-text>
      <fluent-label weight="semibold">Select a Drawer Position</fluent-label>
      <fluent-radio-group id="drawer-radiogroup-inline">
        <fluent-radio value="inline-start" checked>Start</fluent-radio>
        <fluent-radio value="inline-end">End</fluent-radio>
      </fluent-radio-group>
      <fluent-button appearance="primary" @click="${() => toggleSelectedDrawer('drawer-radiogroup-inline')}"
        >Toggle Drawer</fluent-button
      >
    </div>
    <fluent-drawer position="end" size="small" id="drawer-inline-end" type="inline">
      <fluent-drawer-body>
        <span slot="title">Drawer Inline</span>
        <fluent-button
          slot="close"
          appearance="transparent"
          icon-only
          aria-label="close"
          @click="${() => hideDrawer('drawer-inline-end')}"
        >
          ${dismissed20Regular}
        </fluent-button>
        <fluent-text font="base" size="300" weight="regular" as="p">
          <p>
            An inline Drawer is often used for navigation that is not dismissible. As it is on the same level as the
            main surface, users can still interact with other UI elements. This could be useful for swapping between
            different items in the main surface.
          </p>
        </fluent-text>
        <br />
        <br />

        <fluent-text font="monospace" size="300" weight="regular" as="p">
          <code>type="inline"</code>
        </fluent-text>
      </fluent-drawer-body>
    </fluent-drawer>
  </div>
`);

export const Position = renderComponent(html<DrawerStoryArgs>`
  <div class="flex justify--space-between full-height">
    <div>
      <fluent-drawer type="modal" id="drawer-position-start" size="small">
        <fluent-drawer-body>
          <span slot="title">Drawer position start</span>

          <fluent-button
            slot="close"
            appearance="transparent"
            icon-only
            aria-label="close"
            @click="${() => hideDrawer('drawer-position-start')}"
          >
            ${dismissed20Regular}
          </fluent-button>
          <fluent-text font="base" size="300" weight="regular" as="p">
            <p>
              When a Drawer is invoked, it slides in from either the left or right side of the screen. This can be
              specified by the position attribute.
            </p>
          </fluent-text>
          <br />

          <fluent-text font="monospace" size="300" weight="regular">
            <code>default</code>
          </fluent-text>
          <div slot="footer" class="flex gap--16">
            <fluent-button appearance="primary">Primary</fluent-button>
            <fluent-button appearance="secondary">Secondary</fluent-button>
          </div>
        </fluent-drawer-body>
      </fluent-drawer>
    </div>
    <div class="gap--16 column flex justify--center padding--16 width-400">
      <fluent-text weight="bold" size="400" as="h3"><h3>Position</h3></fluent-text>

      <fluent-text font="base" size="300" weight="regular" as="p">
        <p>
          When a Drawer is invoked, it slides in from either the left or right side of the screen. This can be specified
          by the position attribute.
        </p>
      </fluent-text>
      <br />
      <fluent-text font="monospace" size="300" weight="regular">
        <code>position="start"</code>
      </fluent-text>
      <fluent-label weight="semibold">Select a Drawer Position</fluent-label>
      <fluent-radio-group id="drawer-radiogroup-position">
        <fluent-radio value="position-start" checked>Start</fluent-radio>
        <fluent-radio value="position-end">End</fluent-radio>
      </fluent-radio-group>
      <fluent-button appearance="primary" @click="${() => toggleSelectedDrawer('drawer-radiogroup-position')}"
        >Toggle Drawer</fluent-button
      >
    </div>
    <div>
      <fluent-drawer position="modal" type="inline" id="drawer-position-end" size="small">
        <fluent-drawer-body>
          <span slot="title">Drawer position end</span>
          <fluent-button
            slot="close"
            appearance="transparent"
            icon-only
            aria-label="close"
            @click="${() => hideDrawer('drawer-position-end')}"
          >
            ${dismissed20Regular}
          </fluent-button>
          <fluent-text font="base" size="300" weight="regular" as="p">
            <p>
              The drawer component offers flexible positioning options to suit your layout needs. By using the position
              attribute, you can easily place the drawer on either side of the screen. The attribute accepts values of
              type DrawerPosition, which includes two options: 'start' and 'end'. The default position of the Drawer is
              'end'.
            </p>
          </fluent-text>
          <br />
          <br />
          <fluent-text font="monospace" size="300" weight="regular">
            <code>position="end"</code>
          </fluent-text>
          <div slot="footer" class="flex gap--16">
            <fluent-button appearance="primary">Primary</fluent-button>
            <fluent-button appearance="secondary">Secondary</fluent-button>
          </div>
        </fluent-drawer-body>
      </fluent-drawer>
    </div>
  </div>
`);

export const Size = renderComponent(html<DrawerStoryArgs>`
  <div class="flex justify--center full-height">
    <div class="gap--16 column flex justify--center padding--16 width-400">
      <fluent-text weight="bold" size="400" as="h3"><h3>Size</h3></fluent-text>

      <fluent-text font="base" size="300" weight="regular" as="p">
        <p>The size attribute controls the width of the drawer. The default is medium.</p>
      </fluent-text>
      <fluent-text font="monospace" size="300" weight="regular">
        <code>size="small"</code>
      </fluent-text>
      <fluent-label weight="semibold">Select a Drawer Size</fluent-label>
      <fluent-radio-group id="drawer-radiogroup-sizes">
        <fluent-radio value="size-small">Small</fluent-radio>
        <fluent-radio value="size-medium" checked>Medium</fluent-radio>
        <fluent-radio value="size-large">Large</fluent-radio>
        <fluent-radio value="size-full">Full</fluent-radio>
      </fluent-radio-group>
      <fluent-button appearance="primary" @click="${() => toggleSelectedDrawer('drawer-radiogroup-sizes')}"
        >Toggle Drawer</fluent-button
      >
    </div>
    <fluent-drawer size="small" id="drawer-size-small" type="modal">
      <fluent-drawer-body>
      <span slot="title">Drawer small</span>
        <fluent-button
          slot="close"
          appearance="transparent"
          icon-only
          aria-label="close"
          @click="${() => hideDrawer('drawer-size-small')}"
        >
          ${dismissed20Regular}
        </fluent-button>
        <fluent-text font="base" size="300" weight="regular" as="p">
          <p>The size attribute controls the width of the drawer. The default is medium.</p>
        </fluent-text>
        <br />
        <br />
        <fluent-text font="monospace" size="300" weight="regular">
          <code>size="small"</code>
        </fluent-text>
      </fluent-drawer-body>
    </fluent-drawer>
    <fluent-drawer size="medium" id="drawer-size-medium" type="modal">
      <fluent-drawer-body>
      <span slot="title">Drawer medium</span>
        <fluent-button
          slot="close"
          appearance="transparent"
          icon-only
          aria-label="close"
          @click="${() => hideDrawer('drawer-size-medium')}"
        >
          ${dismissed20Regular}
        </fluent-button>
        <fluent-text font="base" size="300" weight="regular" as="p">
          <p>The size attribute controls the width of the drawer. The default is medium.</p>
        </fluent-text>
        <br />
        <br />
        <fluent-text font="monospace" size="300" weight="regular">
          <code>default</code>
        </fluent-text>
      </fluent-drawer-body>
    </fluent-drawer>
    <fluent-drawer size="large" id="drawer-size-large" type="modal">
      <fluent-drawer-body>
      <span slot="title">Drawer large</span>
              <fluent-button
                slot="close"
                appearance="transparent"
                icon-only
                aria-label="close"
                @click="${() => hideDrawer('drawer-size-large')}"
              >
                ${dismissed20Regular}
              </fluent-button>
            <p>The size attribute controls the width of the drawer. The default is medium.</p>
          </fluent-text>
          <br />
          <br />
          <fluent-text font="monospace" size="300" weight="regular">
            <code>size="large"</code>
          </fluent-text>
          </fluent-drawer-body>
    </fluent-drawer>
    <fluent-drawer size="full" id="drawer-size-full" type="modal">
           <fluent-drawer-body>
           <span slot="title">Drawer full</span>
            <fluent-button
              slot="close"
              appearance="transparent"
              icon-only
              aria-label="close"
              @click="${() => hideDrawer('drawer-size-full')}"
            >
              ${dismissed20Regular}
            </fluent-button>
          <fluent-text font="base" size="300" weight="regular" as="p">
            <p>The size attribute controls the width of the drawer. The default is medium.</p>
          </fluent-text>
          <br />
          <br />
          <fluent-text font="monospace" size="300" weight="regular">
            <code>size="full"</code>
          </fluent-text>
          </fluent-drawer-body>
    </fluent-drawer>
  </div>
`);

export const CustomSize = renderComponent(html`
  <div class="flex justify--center full-height">
    <div class="gap--16 column flex justify--center padding--16 width-400">
      <fluent-text weight="bold" size="400" as="h3"><h3>Custom Size</h3></fluent-text>

      <fluent-text font="base" size="300" weight="regular" as="p">
        <p>The Drawer can be sized to any custom width, by overriding the drawer-width CSS variable:</p>
      </fluent-text>
      <br />
      <br />
      <fluent-text font="monospace" size="300" weight="regular">
        <code>var(--drawer-width)</code>
      </fluent-text>
      <fluent-label weight="semibold">Set a Drawer Size</fluent-label>
      <fluent-text-input id="custom-size-input" pattern="^[0-9]*$" type="text"></fluent-text-input>
      <fluent-button appearance="primary" @click="${() => toggleDrawer('drawer-width-custom')}"
        >Toggle Drawer</fluent-button
      >
    </div>
    <fluent-drawer id="drawer-width-custom" type="modal">
      <fluent-drawer-body>
        <span slot="title">Custom size</span>
        <fluent-button
          slot="close"
          appearance="transparent"
          icon-only
          aria-label="close"
          @click="${() => hideDrawer('drawer-width-custom')}"
        >
          ${dismissed20Regular}
        </fluent-button>
        <fluent-text font="base" size="300" weight="regular" as="p">
          <p>The Drawer can be sized to any custom width, by overriding the drawer-width CSS variable:</p>
        </fluent-text>
        <br />
        <fluent-text font="monospace" size="300" weight="regular">
          <code>var(--drawer-width)</code>
        </fluent-text>
      </fluent-drawer-body>
    </fluent-drawer>
  </div>
`);
