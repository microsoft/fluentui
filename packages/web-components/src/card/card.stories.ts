import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import { Checkbox } from '../checkbox/checkbox.js';
import type { Card as FluentCard } from './card.js';
import './define.js';
import { CardAppearance, CardSize } from './card.options.js';

type CardStoryArgs = Args & FluentCard;
type CardStoryMeta = Meta<CardStoryArgs>;

const iconShare = html`<svg
  fill="currentColor"
  aria-hidden="true"
  width="1em"
  height="1em"
  viewBox="0 0 20 20"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="m13.33 12.84 4.5-4.42.05-.07a.59.59 0 0 0-.05-.77l-4.5-4.42-.06-.05c-.36-.27-.9-.01-.9.47V5.7l-.22.01C8.6 6.01 6.5 8.26 6 12.35c-.06.53.54.85.93.5a9.64 9.64 0 0 1 4.45-2.38c.24-.06.5-.1.74-.12l.26-.02v2.17c.06.46.61.67.95.34Zm-1.1-6.12 1.15-.08V4.61L16.82 8l-3.44 3.39V9.23l-1.36.12c-1.7.19-3.32.87-4.83 2 .3-1.33.8-2.34 1.47-3.06a5.2 5.2 0 0 1 3.57-1.57ZM5.5 4A2.5 2.5 0 0 0 3 6.5v8A2.5 2.5 0 0 0 5.5 17h8a2.5 2.5 0 0 0 2.5-2.5v-1a.5.5 0 0 0-1 0v1c0 .83-.67 1.5-1.5 1.5h-8A1.5 1.5 0 0 1 4 14.5v-8C4 5.67 4.67 5 5.5 5h3a.5.5 0 0 0 0-1h-3Z"
    fill="currentColor"
  ></path>
</svg>`;

const iconReply = html`<svg
  fill="currentColor"
  aria-hidden="true"
  width="1em"
  height="1em"
  viewBox="0 0 20 20"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="m3.7 9 3.4 3.39a.5.5 0 0 1-.64.76l-.07-.05-4.24-4.25a.5.5 0 0 1-.06-.63l.06-.07L6.39 3.9a.5.5 0 0 1 .76.64l-.05.07L3.7 8H10a7.5 7.5 0 0 1 7.5 7.26v.24a.5.5 0 0 1-1 0A6.5 6.5 0 0 0 10.23 9H3.7l3.4 3.39L3.7 9Z"
    fill="currentColor"
  ></path>
</svg>`;

const iconEllipsis = html` <svg
  fill="currentColor"
  aria-hidden="true"
  width="20"
  height="20"
  viewBox="0 0 20 20"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M6.75 10a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0Zm5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0ZM15 11.75a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Z"
    fill="currentColor"
  ></path>
</svg>`;

const iconArrow = html` <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M5.50007 1C5.22393 1 5.00007 0.776142 5.00007 0.5C5.00007 0.223858 5.22393 0 5.50007 0H11.5001C11.7762 0 12.0001 0.223858 12.0001 0.5V6.5C12.0001 6.77614 11.7762 7 11.5001 7C11.2239 7 11.0001 6.77614 11.0001 6.5V1.7071L0.853552 11.8536C0.658289 12.0488 0.341707 12.0488 0.146445 11.8536C-0.0488161 11.6583 -0.048815 11.3417 0.146448 11.1464L10.293 1H5.50007Z"
    fill="#616161"
  ></path>
</svg>`;

setTimeout(() => {
  const floatingActionCard = document.querySelector('#card-floating-position') as FluentCard;
  const floatingActionCheckbox = document.querySelector('#floating-action-checkbox') as Checkbox;
  floatingActionCard.addEventListener('onSelectionChanged', function () {
    floatingActionCheckbox.checked = floatingActionCard.selected;
  });
}, 3000);

const cardTemplate = html<CardStoryArgs>`
  <style>
    #anchor--components-card--appearance .css-jspizm,
    #anchor--components-card--size .css-jspizm {
      height: 34em;
    }
    .card--width-320 {
      width: 320px;
    }
    .flex {
      display: flex;
    }
    .column {
      flex-direction: column;
    }
    .gap-16 {
      row-gap: 16px;
      column-gap: 16px;
    }
    .padding-24 {
      padding: 24px;
    }
  </style>
  </script>
  <div style="padding: 48px 24px;">
    <fluent-card
      id="card"
      style="width: 360px;"
      appearance="${x => x.appearance}"
      size="${x => x.size}"
      ?interactive="${x => x.interactive}"
      ?disabled="${x => x.disabled}"
    >
      <div slot="header">
        <div style="display: grid; column-gap: var(--card--size, 12px); grid-template-columns: min-content 1fr min-content; align-items: center;">
          <div style="width: 40px; height: 40px;">
            <fluent-image shape="square" fit="contain" style="display: block;">
              <img alt="card header example image" src="https://picsum.photos/40/40" />
            </fluent-image>
          </div>
          <div>
            <fluent-text align="start" font="base" size="300" weight="bold" >
              <span>App Name</span>
            </fluent-text>
            <fluent-text block size="200" font="base" weight="regular" block>
              <span>Developer</span>
            </fluent-text>
          </div>
          <fluent-button
            ?disabled="${x => x.disabled}"
            size="small"
            icon-only
            appearance="transparent"
            aria-label="actions example button"
          >
            ${iconEllipsis}
          </fluent-button>
        </div>
      </div>
      <div>
        <fluent-text block size="300" font="base" weight="regular">
          <span
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae urna maximus, faucibus augue at,
            lacinia ipsum.</span
          >
        </fluent-text>
      </div>
      <div slot="footer">
          <div style="display: flex; column-gap: var(--card--size, 12px);">
            <fluent-button appearance="primary" ?disabled="${x => x.disabled}"  icon>${iconReply} Reply</fluent-button>
            <fluent-button ?disabled="${x => x.disabled}"  icon>${iconShare} Share</fluent-button>
          </div>
      </div>
    </fluent-card>
  </div>
`;

export default {
  title: 'Components/Card',
  args: {
    appearance: CardAppearance.filled,
    size: CardSize.medium,
    interactive: false,
    disabled: false,
  },
  argTypes: {
    appearance: {
      options: Object.values(CardAppearance),
      control: {
        type: 'select',
      },
    },
    size: {
      options: Object.values(CardSize),
      control: {
        type: 'select',
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        type: {
          summary: 'Sets whether card is disbled or not',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    interactive: {
      control: 'boolean',
      table: {
        type: {
          summary: 'Sets whether card is interactive or not',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
} as CardStoryMeta;

export const Card = renderComponent(cardTemplate).bind({});

//
// Attribute Stories
//

export const Interactive = renderComponent(html<CardStoryArgs>`
  <div style="padding: 48px 24px;">
    <fluent-card id="card-interactive" style="width: 360px;" interactive>
      <div slot="header">
        <div style="display: grid; grid-template-columns: min-content 1fr min-content; align-items: center;">
          <div style="width: 40px; height: 40px; margin-right: var(--card--size)">
            <fluent-image shape="square" fit="contain" style="display: block">
              <img alt="card header example image" src="https://picsum.photos/40/40" />
            </fluent-image>
          </div>
          <div>
            <fluent-text align="start" font="base" size="300" weight="bold">
              <span>App Name</span>
            </fluent-text>
            <fluent-text block size="200" font="base" weight="regular" block>
              <span>Developer</span>
            </fluent-text>
          </div>
        </div>
      </div>
      <div>
        <fluent-text block size="300" font="base" weight="regular">
          <span
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae urna maximus, faucibus augue at,
            lacinia ipsum.</span
          >
        </fluent-text>
      </div>
    </fluent-card>
  </div>
`);

export const InteractiveWithFloatingAction = renderComponent(html<CardStoryArgs>`
  <div style="padding: 48px 24px;">
    <fluent-card interactive orientation="horizontal" id="card-floating-position" style="width: 360px;">
      <div slot="header">
        <div style="width: 40px; height: 40px;">
          <fluent-image shape="square" fit="contain" style="display: block">
            <img alt="card header example image" src="https://picsum.photos/40/40" />
          </fluent-image>
        </div>
        <fluent-checkbox id="floating-action-checkbox" style="position: absolute; right: 0; top: 0;"></fluent-checkbox>
      </div>
      <div style="display: grid; grid-template-columns: 1fr min-content; position: relative;">
        <div>
          <fluent-text align="start" font="base" size="300" weight="bold">
            <span>Teams offsite 2020</span>
          </fluent-text>
          <fluent-text block size="200" font="base" weight="regular" block>
            <span>Onedrive > Files</span>
          </fluent-text>
        </div>
      </div>
    </fluent-card>
  </div>
`);

export const ControlSize = renderComponent(html<CardStoryArgs>`
  <div class="flex gap-16 padding-24" style="height: fit-content;">
    <div class="flex column gap-16">
      <fluent-text align="start" font="base" size="400" weight="bold">
        <span>Orientation Vertical Sizes</span>
      </fluent-text>
      <fluent-card size="small" style="width: 360px;">
        <div slot="header">
          <div style="display: grid; grid-template-columns: min-content 1fr min-content; align-items: center;">
            <div style="width: 40px; height: 40px; margin-right: var(--card--size)">
              <fluent-image shape="square" fit="contain" style="display: block">
                <img alt="card header example image" src="https://picsum.photos/40/40" />
              </fluent-image>
            </div>
            <div>
              <fluent-text align="start" font="base" size="300" weight="bold">
                <span>Card Control Size Small</span>
              </fluent-text>
              <fluent-text block size="200" font="base" weight="regular" block>
                <span>Orientation Vertical</span>
              </fluent-text>
            </div>
            <fluent-button ?disabled="${x => x.disabled}" size="small" icon-only appearance="transparent">
              ${iconEllipsis}
            </fluent-button>
          </div>
        </div>
        <div>
          <fluent-text block size="300" font="base" weight="regular">
            <span
              >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae urna maximus, faucibus augue at,
              lacinia ipsum.</span
            >
          </fluent-text>
        </div>
      </fluent-card>
      <fluent-card size="medium" style="width: 360px;">
        <div slot="header">
          <div style="display: grid; grid-template-columns: min-content 1fr min-content; align-items: center;">
            <div style="width: 40px; height: 40px; margin-right: var(--card--size)">
              <fluent-image shape="square" fit="contain" style="display: block">
                <img alt="card header example image" src="https://picsum.photos/40/40" />
              </fluent-image>
            </div>
            <div>
              <fluent-text align="start" font="base" size="300" weight="bold">
                <span>Card Control Size Medium</span>
              </fluent-text>
              <fluent-text block size="200" font="base" weight="regular" block>
                <span>Orientation Vertical</span>
              </fluent-text>
            </div>
            <fluent-button ?disabled="${x => x.disabled}" size="small" icon-only appearance="transparent">
              ${iconEllipsis}
            </fluent-button>
          </div>
        </div>
        <div>
          <fluent-text block size="300" font="base" weight="regular">
            <span
              >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae urna maximus, faucibus augue at,
              lacinia ipsum.</span
            >
          </fluent-text>
        </div>
      </fluent-card>
      <fluent-card size="large" style="width: 360px;">
        <div slot="header">
          <div style="display: grid; grid-template-columns: min-content 1fr min-content; align-items: center;">
            <div style="width: 40px; height: 40px; margin-right: var(--card--size)">
              <fluent-image shape="square" fit="contain" style="display: block">
                <img alt="card header example image" src="https://picsum.photos/40/40" />
              </fluent-image>
            </div>
            <div>
              <fluent-text align="start" font="base" size="300" weight="bold">
                <span>Card Control Size Large</span>
              </fluent-text>
              <fluent-text block size="200" font="base" weight="regular" block>
                <span>Orientation Vertical</span>
              </fluent-text>
            </div>
            <fluent-button ?disabled="${x => x.disabled}" size="small" icon-only appearance="transparent">
              ${iconEllipsis}
            </fluent-button>
          </div>
        </div>
        <div>
          <fluent-text block size="300" font="base" weight="regular">
            <span
              >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae urna maximus, faucibus augue at,
              lacinia ipsum.</span
            >
          </fluent-text>
        </div>
      </fluent-card>
    </div>
    <div class="flex column gap-16" style="height: fit-content">
      <fluent-text align="start" font="semibold" size="400" weight="bold">
        <span>Orientation Horizontal Sizes</span>
      </fluent-text>
      <fluent-card orientation="horizontal" size="small" style="width: 360px;">
        <div slot="header">
          <div style="width: 40px; height: 40px;">
            <fluent-image shape="square" fit="contain" style="display: block">
              <img alt="card header example image" src="https://picsum.photos/40/40" />
            </fluent-image>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr min-content;">
          <div>
            <fluent-text align="start" font="base" size="300" weight="bold">
              <span>Control Size Small</span>
            </fluent-text>
            <fluent-text block size="200" font="base" weight="regular" block>
              <span>Orientation Horizontal</span>
            </fluent-text>
          </div>
          <div style="display: flex; align-items: center;">
            <fluent-button
              ?disabled="${x => x.disabled}"
              size="small"
              icon-only
              appearance="transparent"
              aria-label="actions example button"
            >
              ${iconEllipsis}
            </fluent-button>
          </div>
        </div>
      </fluent-card>

      <fluent-card orientation="horizontal" size="medium" style="width: 360px;">
        <div slot="header">
          <div style="width: 40px; height: 40px;">
            <fluent-image shape="square" fit="contain" style="display: block">
              <img alt="card header example image" src="https://picsum.photos/40/40" />
            </fluent-image>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr min-content;">
          <div>
            <fluent-text align="start" font="base" size="300" weight="bold">
              <span>Control Size Medium</span>
            </fluent-text>
            <fluent-text block size="200" font="base" weight="regular" block>
              <span>Orientation Horizontal</span>
            </fluent-text>
          </div>
          <div style="display: flex; align-items: center;">
            <fluent-button
              ?disabled="${x => x.disabled}"
              size="small"
              icon-only
              appearance="transparent"
              aria-label="actions example button"
            >
              ${iconEllipsis}
            </fluent-button>
          </div>
        </div>
      </fluent-card>
      <fluent-card orientation="horizontal" size="large" style="width: 360px;">
        <div slot="header">
          <div style="width: 40px; height: 40px;">
            <fluent-image shape="square" fit="contain" style="display: block">
              <img alt="card header example image" src="https://picsum.photos/40/40" />
            </fluent-image>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr min-content;">
          <div>
            <fluent-text align="start" font="base" size="300" weight="bold">
              <span>Control Size Large</span>
            </fluent-text>
            <fluent-text block size="200" font="base" weight="regular" block>
              <span>Orientation Horizontal</span>
            </fluent-text>
          </div>
          <div style="display: flex; align-items: center;">
            <fluent-button
              ?disabled="${x => x.disabled}"
              size="small"
              icon-only
              appearance="transparent"
              aria-label="actions example button"
            >
              ${iconEllipsis}
            </fluent-button>
          </div>
        </div>
      </fluent-card>
    </div>
  </div>
`);

export const Appearance = renderComponent(html<CardStoryArgs>`
  <div class="flex">
    <div style="padding: 48px 24px; display: flex; flex-direction: column; row-gap: 16px;">
      <fluent-text align="start" font="semibold" size="400" weight="bold">
        <span>Non-interactive Appearances</span>
      </fluent-text>
      <fluent-card orientation="horizontal" style="width: 360px;">
        <div slot="header">
          <div style="width: 40px; height: 40px;">
            <fluent-image shape="square" fit="contain" style="display: block">
              <img alt="card header example image" src="https://picsum.photos/40/40" />
            </fluent-image>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr min-content;">
          <div>
            <fluent-text align="start" font="base" size="300" weight="bold">
              <span>Filled</span>
            </fluent-text>
            <fluent-text block size="200" font="base" weight="regular" block>
              <span>filled</span>
            </fluent-text>
          </div>
          <div style="display: flex; align-items: center;">
            <fluent-button
              ?disabled="${x => x.disabled}"
              size="small"
              icon-only
              appearance="transparent"
              aria-label="actions example button"
            >
              ${iconEllipsis}
            </fluent-button>
          </div>
        </div>
      </fluent-card>
      <fluent-card appearance="filled-alternative" orientation="horizontal" style="width: 360px;">
        <div slot="header">
          <div style="width: 40px; height: 40px;">
            <fluent-image shape="square" fit="contain" style="display: block">
              <img alt="card header example image" src="https://picsum.photos/40/40" />
            </fluent-image>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr min-content;">
          <div>
            <fluent-text align="start" font="base" size="300" weight="bold">
              <span>Filled Alternative</span>
            </fluent-text>
            <fluent-text block size="200" font="base" weight="regular" block>
              <span>filled-alternative</span>
            </fluent-text>
          </div>
          <div style="display: flex; align-items: center;">
            <fluent-button
              ?disabled="${x => x.disabled}"
              size="small"
              icon-only
              appearance="transparent"
              aria-label="actions example button"
            >
              ${iconEllipsis}
            </fluent-button>
          </div>
        </div>
      </fluent-card>
      <fluent-card appearance="outline" orientation="horizontal" style="width: 360px;">
        <div slot="header">
          <div style="width: 40px; height: 40px;">
            <fluent-image shape="square" fit="contain" style="display: block">
              <img alt="card header example image" src="https://picsum.photos/40/40" />
            </fluent-image>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr min-content;">
          <div>
            <fluent-text align="start" font="base" size="300" weight="bold">
              <span>Outline</span>
            </fluent-text>
            <fluent-text block size="200" font="base" weight="regular" block>
              <span>outline</span>
            </fluent-text>
          </div>
          <div style="display: flex; align-items: center;">
            <fluent-button
              ?disabled="${x => x.disabled}"
              size="small"
              icon-only
              appearance="transparent"
              aria-label="actions example button"
            >
              ${iconEllipsis}
            </fluent-button>
          </div>
        </div>
      </fluent-card>
      <fluent-card appearance="subtle" orientation="horizontal" style="width: 360px;">
        <div slot="header">
          <div style="width: 40px; height: 40px;">
            <fluent-image shape="square" fit="contain" style="display: block">
              <img alt="card header example image" src="https://picsum.photos/40/40" />
            </fluent-image>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr min-content;">
          <div>
            <fluent-text align="start" font="base" size="300" weight="bold">
              <span>Subtle</span>
            </fluent-text>
            <fluent-text block size="200" font="base" weight="regular" block>
              <span>subtle</span>
            </fluent-text>
          </div>
          <div style="display: flex; align-items: center;">
            <fluent-button
              ?disabled="${x => x.disabled}"
              size="small"
              icon-only
              appearance="transparent"
              aria-label="actions example button"
            >
              ${iconEllipsis}
            </fluent-button>
          </div>
        </div>
      </fluent-card>
    </div>
    <div style="padding: 48px 24px; display: flex; flex-direction: column; row-gap: 16px;">
      <fluent-text align="start" font="semibold" size="400" weight="bold">
        <span>Interactive Appearances</span>
      </fluent-text>
      <fluent-card interactive orientation="horizontal" style="width: 360px;">
        <div slot="header">
          <div style="width: 40px; height: 40px;">
            <fluent-image shape="square" fit="contain" style="display: block">
              <img alt="card header example image" src="https://picsum.photos/40/40" />
            </fluent-image>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr min-content;">
          <div>
            <fluent-text align="start" font="base" size="300" weight="bold">
              <span>Filled</span>
            </fluent-text>
            <fluent-text block size="200" font="base" weight="regular" block>
              <span>filled</span>
            </fluent-text>
          </div>
          <div style="display: flex; align-items: center;">
            <fluent-button
              ?disabled="${x => x.disabled}"
              size="small"
              icon-only
              appearance="transparent"
              aria-label="actions example button"
            >
              ${iconEllipsis}
            </fluent-button>
          </div>
        </div>
      </fluent-card>
      <fluent-card interactive appearance="filled-alternative" orientation="horizontal" style="width: 360px;">
        <div slot="header">
          <div style="width: 40px; height: 40px;">
            <fluent-image shape="square" fit="contain" style="display: block">
              <img alt="card header example image" src="https://picsum.photos/40/40" />
            </fluent-image>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr min-content;">
          <div>
            <fluent-text align="start" font="base" size="300" weight="bold">
              <span>Filled Alternative</span>
            </fluent-text>
            <fluent-text block size="200" font="base" weight="regular" block>
              <span>filled-alternative</span>
            </fluent-text>
          </div>
          <div style="display: flex; align-items: center;">
            <fluent-button
              ?disabled="${x => x.disabled}"
              size="small"
              icon-only
              appearance="transparent"
              aria-label="actions example button"
            >
              ${iconEllipsis}
            </fluent-button>
          </div>
        </div>
      </fluent-card>
      <fluent-card interactive appearance="outline" orientation="horizontal" style="width: 360px;">
        <div slot="header">
          <div style="width: 40px; height: 40px;">
            <fluent-image shape="square" fit="contain" style="display: block">
              <img alt="card header example image" src="https://picsum.photos/40/40" />
            </fluent-image>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr min-content;">
          <div>
            <fluent-text align="start" font="base" size="300" weight="bold">
              <span>Outline</span>
            </fluent-text>
            <fluent-text block size="200" font="base" weight="regular" block>
              <span>outline</span>
            </fluent-text>
          </div>
          <div style="display: flex; align-items: center;">
            <fluent-button
              ?disabled="${x => x.disabled}"
              size="small"
              icon-only
              appearance="transparent"
              aria-label="actions example button"
            >
              ${iconEllipsis}
            </fluent-button>
          </div>
        </div>
      </fluent-card>
      <fluent-card interactive appearance="subtle" orientation="horizontal" style="width: 360px;">
        <div slot="header">
          <div style="width: 40px; height: 40px;">
            <fluent-image shape="square" fit="contain" style="display: block">
              <img alt="card header example image" src="https://picsum.photos/40/40" />
            </fluent-image>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr min-content;">
          <div>
            <fluent-text align="start" font="base" size="300" weight="bold">
              <span>Subtle</span>
            </fluent-text>
            <fluent-text block size="200" font="base" weight="regular" block>
              <span>subtle</span>
            </fluent-text>
          </div>
          <div style="display: flex; align-items: center;">
            <fluent-button
              ?disabled="${x => x.disabled}"
              size="small"
              icon-only
              appearance="transparent"
              aria-label="actions example button"
            >
              ${iconEllipsis}
            </fluent-button>
          </div>
        </div>
      </fluent-card>
    </div>
  </div>
`);

export const Horizontal = renderComponent(html<CardStoryArgs>`
  <div style="padding: 48px 24px;">
    <fluent-card orientation="horizontal" style="width: 360px;">
      <div slot="header">
        <div style="width: 40px; height: 40px;">
          <fluent-image shape="square" fit="contain" style="display: block">
            <img alt="card header example image" src="https://picsum.photos/40/40" />
          </fluent-image>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: 1fr min-content;">
        <div>
          <fluent-text align="start" font="base" size="300" weight="bold">
            <span>Teams offsite 2020</span>
          </fluent-text>
          <fluent-text block size="200" font="base" weight="regular" block>
            <span>Onedrive > Files</span>
          </fluent-text>
        </div>
        <div style="display: flex; align-items: center;">
          <fluent-button
            ?disabled="${x => x.disabled}"
            size="small"
            icon-only
            appearance="transparent"
            aria-label="actions example button"
          >
            ${iconEllipsis}
          </fluent-button>
        </div>
      </div>
    </fluent-card>
  </div>
`);
