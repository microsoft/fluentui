import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Pane as FluentPane } from './pane.js';
import './define.js';
import '../text/define.js';
import { PanePosition, PaneSize } from './pane.options.js';

type PaneStoryArgs = Args & FluentPane;
type PaneStoryMeta = Meta<PaneStoryArgs>;

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

const storyTemplate = html<PaneStoryArgs>`
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
      <div>
        <fluent-pane
          id="pane-playground"
          position="${x => x.position}"
          trap-focus="${x => x.trapFocus}"
          control-size="${x => x.controlSize}"
          modal="${x => x.modal}"
          open
        >
          Content
        </fluent-pane>
      </div>
    </div>
  </div>
`;

export default {
  title: 'Components/Pane',
  args: {
    disabled: false,
    position: PanePosition.right,
    open: false,
    trapFocus: false,
    modal: false,
    controlSize: PaneSize.medium,
  },
  argTypes: {
    open: {
      control: {
        type: 'boolean',
      },
      table: {
        type: {
          summary: 'Sets the open state of pane',
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
          summary: 'Determines if pane is a modal or not',
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
          summary: 'Sets whether the pane traps focus or not',
        },
        defaultValue: {
          summary: false,
        },
      },
    },
    position: {
      options: Object.values(PanePosition),
      control: {
        type: 'select',
      },
      table: {
        type: {
          summary: 'Sets the position of pane',
        },
        defaultValue: {
          summary: PanePosition.right,
        },
      },
    },
    controlSize: {
      options: Object.values(PaneSize),
      control: {
        type: 'select',
      },
      table: {
        type: {
          summary: 'Sets the width of pane',
        },
        defaultValue: {
          summary: PaneSize.medium,
        },
      },
    },
  },
} as PaneStoryMeta;

export const Pane = renderComponent(storyTemplate).bind({});

export const PositionLeft = renderComponent(html<PaneStoryArgs>`
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
        <fluent-pane
          id="pane-left"
          position="left"
          open
        >
          <div slot="header">
            <div style="display: flex; justify-content: space-between; align-items: center;">
            <fluent-text font="base" size="500" weight="semibold">Pane Position left</fluent-text>
              <fluent-button class="toolbar-button" appearance="transparent" icon-only size="small" tabindex="0"aria-label="close">
                ${dismissed16Regular}
              </fluent-button>
            </div>
          </div>
          <div style="display: flex; row-gap: 16px; flex-direction: column;">

          <fluent-text>
            The pane gives users a quick entry point to configuration and information. It should be used when
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
        </fluent-pane>
      </div>
    </div>
  </div>
`);

export const PaneControlSizeSmall = renderComponent(html<PaneStoryArgs>`
    <div style="height: 38em; transform: scale(1); overflow-y: hidden; overflow-x: hidden;">

        <fluent-pane
          id="pane-small"
          control-size="small"
          open
        >
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
            <fluent-text font="base" size="500" weight="semibold">Pane Small</fluent-text>
            <fluent-button class="toolbar-button" appearance="transparent" icon-only size="small" tabindex="0"aria-label="close">
                ${dismissed16Regular}
              </fluent-button>
            </div>
          </div>
          <div style="display: flex; row-gap: 16px; flex-direction: column;">

          <fluent-text>
          To apply a custom number value for the control-size attribute in the Pane component, you can simply assign the desired number to the property. The control-size attribute accepts either a predefined PaneSize value (such as "small", "medium", or "large") or a numeric value.
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
        </fluent-pane>
      </div>
`);

export const PaneControlSizeMedium = renderComponent(html<PaneStoryArgs>`
    <div style="height: 38em; transform: scale(1); overflow-y: hidden; overflow-x: hidden;">

        <fluent-pane
          id="pane-medium"
          open
        >
          <di>
            <div style="display: flex; justify-content: space-between; align-items: center;">
            <fluent-text font="base" size="700" weight="semibold">Pane Medium</fluent-text>
            <fluent-button class="toolbar-button" appearance="transparent" icon-only size="small" tabindex="0"aria-label="close">
                ${dismissed16Regular}
              </fluent-button>
            </div>
          </div>
          <div style="display: flex; row-gap: 16px; flex-direction: column;">

          <fluent-text>
          To apply a custom number value for the control-size attribute in the Pane component, you can simply assign the desired number to the property. The control-size attribute accepts either a predefined PaneSize value (such as "small", "medium", or "large") or a numeric value.
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
        </fluent-pane>
      </div>
`);

export const PaneControlSizeLarge = renderComponent(html<PaneStoryArgs>`
    <div style="height: 38em; transform: scale(1); overflow-y: hidden; overflow-x: hidden;">

        <fluent-pane
          id="pane-large"
          control-size="large"
          open
        >
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
            <fluent-text font="base" size="700" weight="semibold">Pane Large</fluent-text>
              <fluent-button class="toolbar-button" appearance="transparent" icon-only size="small" tabindex="0"aria-label="close">
                ${dismissed16Regular}
              </fluent-button>
            </div>
          </div>

          <fluent-text style="margin-bottom: 20px; display: block;">
          To apply a custom number value for the control-size attribute in the Pane component, you can simply assign the desired number to the property. The control-size attribute accepts either a predefined PaneSize value (such as "small", "medium", or "large") or a numeric value.
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
        </fluent-pane>
      </div>
`);
