import { html } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import type { Drawer as FluentDrawer } from './drawer.js';
import { DrawerPosition, DrawerSize, DrawerType } from './drawer.options.js';

type Story = StoryObj<FluentDrawer>;

const dismissed20Regular = html<StoryArgs<FluentDrawer>>`<svg
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

  if (drawer.dialog.open) {
    drawer.hide();
  } else {
    drawer.show();
  }
};
const hideDrawer = (drawerID: string) => {
  const drawer = document.getElementById(drawerID) as FluentDrawer;
  if (drawer.dialog.open) {
    drawer.hide();
  }
};

const storyTemplate = html<StoryArgs<FluentDrawer>>`
  <fluent-button appearance="primary" @click="${() => toggleDrawer('drawer-default')}"> Toggle Drawer </fluent-button>
  <fluent-drawer
    id="drawer-default"
    position="${story => story.position}"
    size="${story => story.size}"
    type="${story => story.type}"
    style="${story => (story['--drawer-width'] !== '' ? `--drawer-width: ${story['--drawer-width']};` : '')} ${story =>
      story['--dialog-backdrop'] !== '' ? `--dialog-backdrop: ${story['--dialog-backdrop']};` : ''}"
  >
    <fluent-drawer-body>
      <h2 slot="title">Drawer Header</h2>
      <fluent-button slot="close" appearance="transparent" icon-only aria-label="close">
        ${dismissed20Regular}
      </fluent-button>
      <div>
        <fluent-text>
          The drawer gives users a quick entry point to configuration and information. It should be used when retaining
          context is beneficial to users. An overlay is optional depending on whether or not interacting with the
          background content is beneficial to the user's context/scenario. An overlay makes the drawer blocking and
          signifies that the users full attention is required when making configurations.
        </fluent-text>

        <div>
          <fluent-field>
            <label slot="label">Please select an option</label>
            <fluent-radio-group id="demo-options" slot="input" orientation="vertical">
              <fluent-field label-position="after">
                <label for="option-one" slot="label">Option 1</label>
                <fluent-radio id="option-one" slot="input" name="demo-options" value="1"></fluent-radio>
              </fluent-field>
              <fluent-field label-position="after">
                <label for="option-two" slot="label">Option 2</label>
                <fluent-radio id="option-two" slot="input" name="demo-options" value="2"></fluent-radio>
              </fluent-field>
              <fluent-field label-position="after">
                <label for="option-three" slot="label">Option 3</label>
                <fluent-radio id="option-three" slot="input" name="demo-options" value="3"></fluent-radio>
              </fluent-field>
            </fluent-radio-group>
          </fluent-field>
        </div>
      </div>
      <div slot="footer">
        <fluent-button appearance="primary" @click="${() => hideDrawer('drawer-default')}">Close</fluent-button>
        <fluent-button appearance="secondary">Do Something</fluent-button>
      </div>
    </fluent-drawer-body>
  </fluent-drawer>
`;

export default {
  title: 'Components/Drawer',
  render: renderComponent(storyTemplate),
  args: {
    type: DrawerType.modal,
    size: DrawerSize.medium,
    position: DrawerPosition.start,
    '--drawer-width': '',
    '--dialog-backdrop': 'var(--colorBackgroundOverlay)',
  },
  argTypes: {
    position: {
      control: 'select',
      description: 'Sets the position of drawer',
      mapping: { '': null, ...DrawerPosition },
      options: ['', ...Object.values(DrawerPosition)],
      table: {
        category: 'attributes',
        type: { summary: Object.values(DrawerPosition).join('|') },
      },
    },
    type: {
      control: 'select',
      description: 'Sets the modal type of the drawer',
      mapping: { '': null, ...DrawerType },
      options: ['', ...Object.values(DrawerType)],
      table: {
        category: 'attributes',
        type: { summary: Object.values(DrawerType).join('|') },
      },
    },
    size: {
      control: 'select',
      description: 'Sets the modal type of the drawer',
      mapping: { '': null, ...DrawerSize },
      options: ['', ...Object.values(DrawerSize)],
      table: {
        category: 'attributes',
        type: { summary: Object.values(DrawerSize).join('|') },
      },
    },
    '--drawer-width': {
      control: 'text',
      description: 'Sets the custom width of drawer, e.g. 300px',
      required: false,
      table: {
        category: 'CSS Custom Properties',
      },
    },
    '--dialog-backdrop': {
      control: 'color',
      description: 'Sets the custom color of the drawer backdrop, e.g. #000000',
      required: false,
      table: {
        category: 'CSS Custom Properties',
        type: { summary: 'Defaults to --colorBackgroundOverlay' },
      },
    },
  },
} as Meta<FluentDrawer>;

export const Default: Story = {};
