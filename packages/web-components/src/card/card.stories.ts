import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Checkbox as FluentCheckbox } from '../checkbox/checkbox.js';
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

const toggleDefaultSelected = () => {
  const card = document.querySelector('#card-default') as FluentCard;
  const checkbox = card.querySelector('[role="checkbox"]') as FluentCheckbox;
  if (checkbox && card) {
    card.toggleCardSelection(checkbox.checked);
  }
};

const cardTemplate = html<CardStoryArgs>`
  <style>
    #anchor--components-card--appearance .css-jspizm {
      height: 38em;
    }
    #anchor--components-card--size .css-jspizm {
      height: 43em;
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
      id="card-default"
      style="width: 360px;"
      appearance="${x => x.appearance}"
      orientation="${x => x.orientation}"
      size="${x => x.size}"
      ?interactive="${x => x.interactive}"
      ?selectable="${x => x.selectable}"
      ?disabled="${x => x.disabled}"
    >
      <fluent-checkbox
        id="card-selectable-checkbox"
        slot="floating-action"
        @change="${x => {
          if (x.selectable) {
            toggleDefaultSelected();
          }
        }}"
      ></fluent-checkbox>
      <div slot="header">
        <div style="display: grid; column-gap: var(--card-size, 12px); grid-template-columns: min-content 1fr min-content; align-items: center;">
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
`;

export default {
  title: 'Components/Card',
  args: {
    appearance: CardAppearance.filled,
    size: CardSize.medium,
    interactive: false,
    selectable: false,
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
    selectable: {
      control: 'boolean',
      table: {
        type: {
          summary: 'Sets whether card is selectable or not',
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

const toggleSelectionWithFloatingAction = (x: Event) => {
  const card = document.querySelector('#card-selectable-not-interactive') as FluentCard;
  const checkbox = document.querySelector('#card-selectable-checkbox') as FluentCheckbox;
  if (checkbox && card) {
    card.toggleCardSelection(checkbox.checked);
  }
};

export const SelectableWithFloatingAction = renderComponent(html<CardStoryArgs>`
  <div style="padding: 48px 24px;">
    <fluent-card orientation="horizontal" id="card-selectable-not-interactive" style="width: 360px;" selectable>
      <fluent-checkbox
        @change="${toggleSelectionWithFloatingAction}"
        id="card-selectable-checkbox"
        slot="floating-action"
      ></fluent-checkbox>
      <fluent-image
        style="width: 64px; height: 64px; display: block;"
        block
        slot="card-preview"
        shape="square"
        fit="contain"
        style="display: block;"
      >
        <img alt="card header example image" src="https://picsum.photos/64/64" />
      </fluent-image>
      <div slot="header">
        <div style="display: grid; grid-template-columns: 1fr auto;">
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
    </fluent-card>
  </div>
`);

let clickCount = 0;
const increaseCount = () => {
  clickCount += 1;
  const textContainer = document.querySelector('#text-container') as HTMLElement;
  if (textContainer) {
    textContainer.innerText = `${clickCount}`;
  }
};

export const Interactive = renderComponent(html<CardStoryArgs>`
  <div style="padding: 48px 24px; display: flex; flex-direction: column; align-items: center; margin: auto;">
    <fluent-card id="card-interactive" style="width: 360px;" interactive @click="${increaseCount}">
      <div slot="header">
        <div style="display: grid; grid-template-columns: min-content 1fr min-content; align-items: center;">
          <div style="width: 40px; height: 40px; margin-right: var(--card-size)">
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
    <fluent-text size="400" weight="semibold" style="margin-top: 8px;"
      ><p>Card click <span id="text-container">0</span> times</p></fluent-text
    >
  </div>
`);

export const SelectableInteractive = renderComponent(html<CardStoryArgs>`
  <div style="padding: 48px 24px;">
    <fluent-card id="card-selectable-interactive" style="width: 360px;" selectable interactive>
      <div slot="header">
        <div style="display: grid; grid-template-columns: min-content 1fr min-content; align-items: center;">
          <div style="width: 40px; height: 40px; margin-right: var(--card-size)">
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

const toggleFloatingActionWithInteractiveSelectable = (e: Event) => {
  const card = document.querySelector('#card-interactive-selectable-floating-action') as FluentCard;
  const checkbox = card.querySelector('[role="checkbox"]') as FluentCheckbox;
  checkbox.checked = card.selected;
};

export const SelectableInteractiveWithFloatingAction = renderComponent(html<CardStoryArgs>`
  <div style="padding: 48px 24px;">
    <fluent-card
      @onSelectionChanged="${toggleFloatingActionWithInteractiveSelectable}"
      interactive
      selectable
      orientation="horizontal"
      id="card-interactive-selectable-floating-action"
      style="width: 360px;"
    >
      <fluent-checkbox slot="floating-action" id="floating-action-checkbox"></fluent-checkbox>
      <fluent-image
        style="width: 64px; height: 64px; display: block;"
        block
        slot="card-preview"
        shape="square"
        fit="contain"
        style="display: block;"
      >
        <img alt="card header example image" src="https://picsum.photos/64/64" />
      </fluent-image>
      <div slot="header">
        <div style="display: grid; align-items: center;">
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
    </fluent-card>
  </div>
`);

export const Footer = renderComponent(html<CardStoryArgs>`
  <div style="padding: 48px 24px;">
    <fluent-card style="width: 360px;">
      <div slot="header">
        <div style="display: grid; grid-template-columns: min-content 1fr min-content; align-items: center;">
          <div style="width: 40px; height: 40px; margin-right: var(--card-size)">
            <fluent-image shape="square" fit="contain" style="display: block">
              <img alt="card header example image" src="https://picsum.photos/40/40" />
            </fluent-image>
          </div>
          <div>
            <fluent-text align="start" font="base" size="300" weight="bold">
              <span>Card with Footer</span>
            </fluent-text>
            <fluent-text block size="200" font="base" weight="regular" block>
              <span>Lorem ipsum dolor</span>
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
      <div slot="footer">
        <div style="display: flex; column-gap: var(--card-size, 12px);">
          <fluent-button appearance="primary" icon>${iconReply} Reply</fluent-button>
          <fluent-button icon>${iconShare} Share</fluent-button>
        </div>
      </div>
    </fluent-card>
  </div>
`);

export const Size = renderComponent(html<CardStoryArgs>`
  <div class="flex gap-16 padding-24" style="height: fit-content;">
    <div class="flex column gap-16">
      <fluent-text align="start" font="base" size="400" weight="bold">
        <span>Orientation Vertical Sizes</span>
      </fluent-text>
      <fluent-card size="small" style="width: 360px;">
        <div slot="header">
          <div style="display: grid; grid-template-columns: min-content 1fr min-content; align-items: center;">
            <div style="width: 40px; height: 40px; margin-right: var(--card-size)">
              <fluent-image shape="square" fit="contain" style="display: block">
                <img alt="card header example image" src="https://picsum.photos/40/40" />
              </fluent-image>
            </div>
            <div>
              <fluent-text align="start" font="base" size="300" weight="bold">
                <span>Card Size Small</span>
              </fluent-text>
              <fluent-text block size="200" font="base" weight="regular" block>
                <span>Orientation Vertical</span>
              </fluent-text>
            </div>
            <fluent-button size="small" icon-only appearance="transparent"> ${iconEllipsis} </fluent-button>
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
            <div style="width: 40px; height: 40px; margin-right: var(--card-size)">
              <fluent-image shape="square" fit="contain" style="display: block">
                <img alt="card header example image" src="https://picsum.photos/40/40" />
              </fluent-image>
            </div>
            <div>
              <fluent-text align="start" font="base" size="300" weight="bold">
                <span>Card Size Medium</span>
              </fluent-text>
              <fluent-text block size="200" font="base" weight="regular" block>
                <span>Orientation Vertical</span>
              </fluent-text>
            </div>
            <fluent-button size="small" icon-only appearance="transparent"> ${iconEllipsis} </fluent-button>
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
            <div style="width: 40px; height: 40px; margin-right: var(--card-size)">
              <fluent-image shape="square" fit="contain" style="display: block">
                <img alt="card header example image" src="https://picsum.photos/40/40" />
              </fluent-image>
            </div>
            <div>
              <fluent-text align="start" font="base" size="300" weight="bold">
                <span>Card Size Large</span>
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
        <fluent-image
          style="width: 64px; height: 64px; display: block;"
          block
          slot="card-preview"
          shape="square"
          fit="contain"
          style="display: block;"
        >
          <img alt="card header example image" src="https://picsum.photos/64/64" />
        </fluent-image>
        <div slot="header">
          <div style="display: grid; grid-template-columns: 1fr auto;">
            <div>
              <fluent-text align="start" font="base" size="300" weight="bold">
                <span>App Name</span>
              </fluent-text>
              <fluent-text block size="200" font="base" weight="regular" block>
                <span>Developer</span>
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
        </div>
      </fluent-card>

      <fluent-card orientation="horizontal" size="medium" style="width: 360px;">
        <fluent-image
          style="width: 64px; height: 64px; display: block;"
          block
          slot="card-preview"
          shape="square"
          fit="contain"
          style="display: block;"
        >
          <img alt="card header example image" src="https://picsum.photos/64/64" />
        </fluent-image>
        <div slot="header">
          <div style="display: grid; grid-template-columns: 1fr auto;">
            <div>
              <fluent-text align="start" font="base" size="300" weight="bold">
                <span>App Name</span>
              </fluent-text>
              <fluent-text block size="200" font="base" weight="regular" block>
                <span>Developer</span>
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
        </div>
      </fluent-card>
      <fluent-card orientation="horizontal" size="large" style="width: 360px;">
        <fluent-image
          style="width: 64px; height: 64px; display: block;"
          block
          slot="card-preview"
          shape="square"
          fit="contain"
          style="display: block;"
        >
          <img alt="card header example image" src="https://picsum.photos/64/64" />
        </fluent-image>
        <div slot="header">
          <div style="display: grid; grid-template-columns: 1fr auto;">
            <div>
              <fluent-text align="start" font="base" size="300" weight="bold">
                <span>App Name</span>
              </fluent-text>
              <fluent-text block size="200" font="base" weight="regular" block>
                <span>Developer</span>
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
        <fluent-image
          style="width: 64px; height: 64px; display: block;"
          block
          slot="card-preview"
          shape="square"
          fit="contain"
          style="display: block;"
        >
          <img alt="card header example image" src="https://picsum.photos/64/64" />
        </fluent-image>
        <div slot="header">
          <div style="display: grid; grid-template-columns: 1fr auto;">
            <div>
              <fluent-text align="start" font="base" size="300" weight="bold">
                <span>App Name</span>
              </fluent-text>
              <fluent-text block size="200" font="base" weight="regular" block>
                <span>Developer</span>
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
        </div>
      </fluent-card>
      <fluent-card appearance="filled-alternative" orientation="horizontal" style="width: 360px;">
        <fluent-image
          style="width: 64px; height: 64px; display: block;"
          block
          slot="card-preview"
          shape="square"
          fit="contain"
          style="display: block;"
        >
          <img alt="card header example image" src="https://picsum.photos/64/64" />
        </fluent-image>
        <div slot="header">
          <div style="display: grid; grid-template-columns: 1fr auto;">
            <div>
              <fluent-text align="start" font="base" size="300" weight="bold">
                <span>App Name</span>
              </fluent-text>
              <fluent-text block size="200" font="base" weight="regular" block>
                <span>Developer</span>
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
        </div>
      </fluent-card>
      <fluent-card appearance="outline" orientation="horizontal" style="width: 360px;">
        <fluent-image
          style="width: 64px; height: 64px; display: block;"
          block
          slot="card-preview"
          shape="square"
          fit="contain"
          style="display: block;"
        >
          <img alt="card header example image" src="https://picsum.photos/64/64" />
        </fluent-image>
        <div slot="header">
          <div style="display: grid; grid-template-columns: 1fr auto;">
            <div>
              <fluent-text align="start" font="base" size="300" weight="bold">
                <span>App Name</span>
              </fluent-text>
              <fluent-text block size="200" font="base" weight="regular" block>
                <span>Developer</span>
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
        </div>
      </fluent-card>
      <fluent-card appearance="subtle" orientation="horizontal" style="width: 360px;">
        <fluent-image
          style="width: 64px; height: 64px; display: block;"
          block
          slot="card-preview"
          shape="square"
          fit="contain"
          style="display: block;"
        >
          <img alt="card header example image" src="https://picsum.photos/64/64" />
        </fluent-image>
        <div slot="header">
          <div style="display: grid; grid-template-columns: 1fr auto;">
            <div>
              <fluent-text align="start" font="base" size="300" weight="bold">
                <span>App Name</span>
              </fluent-text>
              <fluent-text block size="200" font="base" weight="regular" block>
                <span>Developer</span>
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
        </div>
      </fluent-card>
    </div>
    <div style="padding: 48px 24px; display: flex; flex-direction: column; row-gap: 16px;">
      <fluent-text align="start" font="semibold" size="400" weight="bold">
        <span>Interactive + Selectable Appearances</span>
      </fluent-text>
      <fluent-card interactive selectable orientation="horizontal" style="width: 360px;">
        <fluent-image
          style="width: 64px; height: 64px; display: block;"
          block
          slot="card-preview"
          shape="square"
          fit="contain"
          style="display: block;"
        >
          <img alt="card header example image" src="https://picsum.photos/64/64" />
        </fluent-image>
        <div slot="header">
          <div style="display: grid; grid-template-columns: 1fr auto;">
            <div>
              <fluent-text align="start" font="base" size="300" weight="bold">
                <span>App Name</span>
              </fluent-text>
              <fluent-text block size="200" font="base" weight="regular" block>
                <span>Developer</span>
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
        </div>
      </fluent-card>
      <fluent-card
        interactive
        selectable
        appearance="filled-alternative"
        orientation="horizontal"
        style="width: 360px;"
      >
        <fluent-image
          style="width: 64px; height: 64px; display: block;"
          block
          slot="card-preview"
          shape="square"
          fit="contain"
          style="display: block;"
        >
          <img alt="card header example image" src="https://picsum.photos/64/64" />
        </fluent-image>
        <div slot="header">
          <div style="display: grid; grid-template-columns: 1fr auto;">
            <div>
              <fluent-text align="start" font="base" size="300" weight="bold">
                <span>App Name</span>
              </fluent-text>
              <fluent-text block size="200" font="base" weight="regular" block>
                <span>Developer</span>
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
        </div>
      </fluent-card>
      <fluent-card interactive selectable appearance="outline" orientation="horizontal" style="width: 360px;">
        <fluent-image
          style="width: 64px; height: 64px; display: block;"
          block
          slot="card-preview"
          shape="square"
          fit="contain"
          style="display: block;"
        >
          <img alt="card header example image" src="https://picsum.photos/64/64" />
        </fluent-image>
        <div slot="header">
          <div style="display: grid; grid-template-columns: 1fr auto;">
            <div>
              <fluent-text align="start" font="base" size="300" weight="bold">
                <span>App Name</span>
              </fluent-text>
              <fluent-text block size="200" font="base" weight="regular" block>
                <span>Developer</span>
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
        </div>
      </fluent-card>
      <fluent-card interactive selectable appearance="subtle" orientation="horizontal" style="width: 360px;">
        <fluent-image
          style="width: 64px; height: 64px; display: block;"
          block
          slot="card-preview"
          shape="square"
          fit="contain"
          style="display: block;"
        >
          <img alt="card header example image" src="https://picsum.photos/64/64" />
        </fluent-image>
        <div slot="header">
          <div style="display: grid; grid-template-columns: 1fr auto;">
            <div>
              <fluent-text align="start" font="base" size="300" weight="bold">
                <span>App Name</span>
              </fluent-text>
              <fluent-text block size="200" font="base" weight="regular" block>
                <span>Developer</span>
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
        </div>
      </fluent-card>
    </div>
  </div>
`);

export const Horizontal = renderComponent(html<CardStoryArgs>`
  <div style="padding: 48px 24px;">
    <fluent-card orientation="horizontal" style="width: 360px;">
      <fluent-image
        style="width: 64px; height: 64px; display: block;"
        block
        slot="card-preview"
        shape="square"
        fit="contain"
        style="display: block;"
      >
        <img alt="card header example image" src="https://picsum.photos/64/64" />
      </fluent-image>
      <div slot="header">
        <div style="display: grid; grid-template-columns: 1fr auto;">
          <div>
            <fluent-text align="start" font="base" size="300" weight="bold">
              <span>App Name</span>
            </fluent-text>
            <fluent-text block size="200" font="base" weight="regular" block>
              <span>Developer</span>
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
      </div>
    </fluent-card>
  </div>
`);
