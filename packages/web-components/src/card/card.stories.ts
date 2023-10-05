import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { keyEnter, keySpace } from '@microsoft/fast-web-utilities';
import { renderComponent } from '../helpers.stories.js';
import type { Checkbox as FluentCheckbox } from '../checkbox/checkbox.js';
import '../card/define.js';
import './define.js';
import '../card-footer/define.js';
import '../card-preview/define.js';
import { CardAppearance, CardFocusMode, CardSize } from '../card/card.options.js';
import type { Card as FluentCard } from './card.js';

type CardStoryArgs = Args & FluentCard;
type CardStoryMeta = Meta<CardStoryArgs>;

const iconShare = html`<svg
  fill="currentColor"
  aria-hidden="true"
  width="1em"
  height="1em"
  viewBox="0 0 20 20"
  xmlns="http://www.w3.org/2000/svg"
  slot="start"
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
  slot="start"
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

let count = 0;
const increaseCount = () => {
  const textContainer = document.getElementById('text-container');
  count++;
  if (textContainer) {
    textContainer.innerText = `${count}`;
  }
};

setTimeout(() => {
  const card = document.getElementById('card-interactive') as FluentCard;
  card.addEventListener('keydown', (e: KeyboardEvent) => {
    const key = e.key;
    if (key == keyEnter || key == keySpace) {
      e.preventDefault();
      increaseCount();
    }
  });
}, 2000);

const toggleFloatingActionWithInteractiveSelectable = (event: Event) => {
  const card = document.getElementById('card-interactive-selectable-floating-action') as FluentCard;
  const checkbox = card.querySelector('[role="checkbox"]') as FluentCheckbox;
  if (checkbox && card) {
    checkbox.checked = card.selected;
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
    .card--width-360 {
      width: 360px;
    }
    .image-size-40 {
      height: 40px;
      width: 40px;
    }
    .image-size-64 {
      height: 64px;
      width: 64px;
    }
    .flex {
      display: flex;
      row-gap: 12px;
      column-gap: 12px;
    }
    .column {
      flex-direction: column;
    }
    .center {
      justify-content: center;
      align-items: center;
    }
    .align-center {
      align-items: center;
    }
    .align-start {
      align-items: flex-start;
    }
    .space-around {
      justify-content: space-around;
    }
    .full-width {
      margin: 0 calc(var(--card-size) * -1);
    }
    .full-height {
      margin: calc(var(--card-size) * -1) 0 calc(var(--card-size) * -1) calc(var(--card-size) * -1);
    }
    .cover {
      margin: calc(var(--card-size) * -1);
    }
    .logo {
      height: 32px;
      width: 32px;
      position: absolute;
      left: var(--card-size);
      bottom: var(--card-size);
    }
  </style>
  </script>
  <div class="container center flex column">
  <fluent-card
      id="card-default"
      style="width: 690px;"
      appearance="${x => x.appearance}"
      size="${x => x.size}"
      ?interactive="${x => x.interactive}"
      ?selectable="${x => x.selectable}"
      ?disabled="${x => x.disabled}"
      focus-mode="${x => x.focusMode}"
    >
      <fluent-card-header>
        <fluent-image
          class="image-size-40"
          block
          slot="image"
          shape="square"
        >
          <img  src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/avatar_elvia.svg" />

        </fluent-image>
        <fluent-text align="start" font="base" size="300" weight="bold" slot="header">
          <span>Elvia Atkins</span>
          <fluent-text align="start" font="base" size="300" weight="regular"><span>mentioned you</span></fluent-text>
        </fluent-text>
        <fluent-text block size="200" font="base" weight="regular" block slot="description">
          <span>5h ago - About us - Overview</span>
        </fluent-text>
        <fluent-button tabindex="0" slot="action" ?disabled="${x =>
          x.disabled}" icon-only appearance="transparent">${iconEllipsis}</fluent-button>
      </fluent-card-header>
      <fluent-card-preview class="full-width">
        <fluent-image
          block
          shape="square"
        >
          <img src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/doc_template.png" />
        </fluent-image>
        <fluent-image
          block
          shape="square"
          slot="logo"
          class="logo"
        >
          <img src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/docx.png" />
        </fluent-image>
      </fluent-card-preview>
      <fluent-card-footer>
        <div>
          <fluent-button tabindex="0" ?disabled="${x => x.disabled}" icon>${iconReply}Reply</fluent-button>
          <fluent-button tabindex="0" ?disabled="${x => x.disabled}" icon>${iconShare}Share</fluent-button>
        </div>

      </fluent-card-footer>
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
      table: {
        type: {
          summary: 'Sets the size of card',
        },
        defaultValue: {
          summary: 'medium',
        },
      },
    },
    focusMode: {
      options: Object.values(CardFocusMode),
      control: {
        type: 'select',
      },
      table: {
        type: {
          summary: 'Sets the focus mode of card',
        },
        defaultValue: {
          summary: 'off',
        },
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

/** Attribute Stories **/

export const Orientation = renderComponent(html<CardStoryArgs>`
  <div class="flex space-around align-center">
    <div class="align-start flex column">
      <fluent-card orientation="horizontal" class="card--width-360">
        <fluent-card-preview class="full-height">
          <fluent-image class="image-size-64" block shape="square">
            <img
              src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/app_logo.svg"
            />
          </fluent-image>
        </fluent-card-preview>
        <fluent-card-header>
          <fluent-text align="start" font="base" size="300" weight="bold" slot="header">
            <span>Horizontal</span>
          </fluent-text>
          <fluent-text block size="200" font="base" weight="regular" block slot="description">
            <span>Fluent Card Orientation</span>
          </fluent-text>
          <fluent-button
            slot="action"
            ?disabled="${x => x.disabled}"
            size="small"
            icon-only
            appearance="transparent"
            aria-label="actions example button"
          >
            ${iconEllipsis}
          </fluent-button>
        </fluent-card-header>
      </fluent-card>
    </div>
    <div class="align-start flex column">
      <fluent-card class="card--width-360">
        <fluent-card-header>
          <fluent-image class="image-size-40" block slot="image" shape="square">
            <img
              src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/app_logo.svg"
            />
          </fluent-image>
          <fluent-text align="start" font="base" size="300" weight="bold" slot="header">
            <span>Vertical</span>
          </fluent-text>
          <fluent-text block size="200" font="base" weight="regular" block slot="description">
            <span>Fluent Card Orientation</span>
          </fluent-text>
          <fluent-button
            slot="action"
            ?disabled="${x => x.disabled}"
            size="small"
            icon-only
            appearance="transparent"
            aria-label="actions example button"
          >
            ${iconEllipsis}
          </fluent-button>
        </fluent-card-header>
        <fluent-text block size="300" font="base" weight="regular">
          <span
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae urna maximus, faucibus augue at,
            lacinia ipsum.</span
          >
        </fluent-text>
        <fluent-card-footer>
          <div>
            <fluent-button appearance="primary" tabindex="0" ?disabled="${x => x.disabled}" icon
              >${iconReply}Reply</fluent-button
            >
            <fluent-button tabindex="0" ?disabled="${x => x.disabled}" icon>${iconShare}Share</fluent-button>
          </div>
        </fluent-card-footer>
      </fluent-card>
    </div>
  </div>
`);

export const Size = renderComponent(html<CardStoryArgs>`
  <div class="container center flex column">
    <fluent-card size="small" class="card--width-360">
      <fluent-card-header>
        <fluent-image class="image-size-40" block slot="image" shape="square">
          <img
            src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/app_logo.svg"
          />
        </fluent-image>
        <fluent-text align="start" font="base" size="300" weight="bold" slot="header">
          <span>Small</span>
        </fluent-text>
        <fluent-text block size="200" font="base" weight="regular" block slot="description">
          <span>Fluent Card Size</span>
        </fluent-text>
      </fluent-card-header>
      <div>
        <fluent-text block size="300" font="base" weight="regular">
          <span
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae urna maximus, faucibus augue at,
            lacinia ipsum.</span
          >
        </fluent-text>
      </div>
    </fluent-card>
    <fluent-card class="card--width-360">
      <fluent-card-header>
        <fluent-image class="image-size-40" block slot="image" shape="square">
          <img
            src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/app_logo.svg"
          />
        </fluent-image>
        <fluent-text align="start" font="base" size="300" weight="bold" slot="header">
          <span>Medium</span>
        </fluent-text>
        <fluent-text block size="200" font="base" weight="regular" block slot="description">
          <span>Fluent Card Size</span>
        </fluent-text>
      </fluent-card-header>
      <div>
        <fluent-text block size="300" font="base" weight="regular">
          <span
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae urna maximus, faucibus augue at,
            lacinia ipsum.</span
          >
        </fluent-text>
      </div>
    </fluent-card>
    <fluent-card size="large" class="card--width-360">
      <fluent-card-header>
        <fluent-image class="image-size-40" block slot="image" shape="square">
          <img
            src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/app_logo.svg"
          />
        </fluent-image>
        <fluent-text align="start" font="base" size="300" weight="bold" slot="header">
          <span>Large</span>
        </fluent-text>
        <fluent-text block size="200" font="base" weight="regular" block slot="description">
          <span>Fluent Card Size</span>
        </fluent-text>
      </fluent-card-header>
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

export const Appearance = renderComponent(html<CardStoryArgs>`
  <div class="flex space-around">
    <div class="container align-start flex column">
      <fluent-text align="start" font="semibold" size="400" weight="bold">
        <span>Non-interactive Appearances</span>
      </fluent-text>
      <fluent-card orientation="horizontal" class="card--width-360">
        <fluent-card-preview class="full-height">
          <fluent-image class="image-size-64" block shape="square" fit="cover">
            <img
              src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/app_logo.svg"
            />
          </fluent-image>
        </fluent-card-preview>
        <fluent-card-header>
          <fluent-text align="start" font="base" size="300" weight="bold" slot="header">
            <span>Filled</span>
          </fluent-text>
          <fluent-text block size="200" font="base" weight="regular" block slot="description">
            <span>Fluent Card</span>
          </fluent-text>
          <fluent-button
            slot="action"
            ?disabled="${x => x.disabled}"
            size="small"
            icon-only
            appearance="transparent"
            aria-label="actions example button"
          >
            ${iconEllipsis}
          </fluent-button>
        </fluent-card-header>
      </fluent-card>
      <fluent-card appearance="filled-alternative" orientation="horizontal" class="card--width-360">
        <fluent-card-preview class="full-height">
          <fluent-image class="image-size-64" block shape="square" fit="cover">
            <img
              src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/app_logo.svg"
            />
          </fluent-image>
        </fluent-card-preview>
        <fluent-card-header>
          <fluent-text align="start" font="base" size="300" weight="bold" slot="header">
            <span>Filled Alternative</span>
          </fluent-text>
          <fluent-text block size="200" font="base" weight="regular" block slot="description">
            <span>Fluent Card Appearance</span>
          </fluent-text>
          <fluent-button
            slot="action"
            ?disabled="${x => x.disabled}"
            size="small"
            icon-only
            appearance="transparent"
            aria-label="actions example button"
          >
            ${iconEllipsis}
          </fluent-button>
        </fluent-card-header>
      </fluent-card>
      <fluent-card appearance="outline" orientation="horizontal" class="card--width-360">
        <fluent-card-preview class="full-height">
          <fluent-image class="image-size-64" block shape="square" fit="cover">
            <img
              src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/app_logo.svg"
            />
          </fluent-image>
        </fluent-card-preview>
        <fluent-card-header>
          <fluent-text align="start" font="base" size="300" weight="bold" slot="header">
            <span>Outline</span>
          </fluent-text>
          <fluent-text block size="200" font="base" weight="regular" block slot="description">
            <span>Fluent Card Appearance</span>
          </fluent-text>
          <fluent-button
            slot="action"
            ?disabled="${x => x.disabled}"
            size="small"
            icon-only
            appearance="transparent"
            aria-label="actions example button"
          >
            ${iconEllipsis}
          </fluent-button>
        </fluent-card-header>
      </fluent-card>
      <fluent-card appearance="subtle" orientation="horizontal" class="card--width-360">
        <fluent-card-preview class="full-height">
          <fluent-image class="image-size-64" block shape="square" fit="cover">
            <img
              src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/app_logo.svg"
            />
          </fluent-image>
        </fluent-card-preview>
        <fluent-card-header>
          <fluent-text align="start" font="base" size="300" weight="bold" slot="header">
            <span>Subtle</span>
          </fluent-text>
          <fluent-text block size="200" font="base" weight="regular" block slot="description">
            <span>Fluent Card Appearance</span>
          </fluent-text>
          <fluent-button
            slot="action"
            ?disabled="${x => x.disabled}"
            size="small"
            icon-only
            appearance="transparent"
            aria-label="actions example button"
          >
            ${iconEllipsis}
          </fluent-button>
        </fluent-card-header>
      </fluent-card>
    </div>
    <div class="container align-start flex column">
      <fluent-text align="start" font="semibold" size="400" weight="bold">
        <span>Interactive + Selectable Appearances</span>
      </fluent-text>
      <fluent-card interactive selectable orientation="horizontal" class="card--width-360">
        <fluent-card-preview class="full-height">
          <fluent-image class="image-size-64" block shape="square" fit="cover">
            <img
              src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/app_logo.svg"
            />
          </fluent-image>
        </fluent-card-preview>
        <fluent-card-header>
          <fluent-text align="start" font="base" size="300" weight="bold" slot="header">
            <span>Filled Interactive</span>
          </fluent-text>
          <fluent-text block size="200" font="base" weight="regular" block slot="description">
            <span>Fluent Card Appearance</span>
          </fluent-text>
        </fluent-card-header>
      </fluent-card>
      <fluent-card
        appearance="filled-alternative"
        interactive
        selectable
        orientation="horizontal"
        class="card--width-360"
      >
        <fluent-card-preview class="full-height">
          <fluent-image class="image-size-64" block shape="square" fit="cover">
            <img
              src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/app_logo.svg"
            />
          </fluent-image>
        </fluent-card-preview>
        <fluent-card-header>
          <fluent-text align="start" font="base" size="300" weight="bold" slot="header">
            <span>Filled Alternative Interactive</span>
          </fluent-text>
          <fluent-text block size="200" font="base" weight="regular" block slot="description">
            <span>Fluent Card Appearance</span>
          </fluent-text>
        </fluent-card-header>
      </fluent-card>
      <fluent-card interactive selectable appearance="outline" orientation="horizontal" class="card--width-360">
        <fluent-card-preview class="full-height">
          <fluent-image class="image-size-64" block shape="square" fit="cover">
            <img
              src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/app_logo.svg"
            />
          </fluent-image>
        </fluent-card-preview>
        <fluent-card-header>
          <fluent-text align="start" font="base" size="300" weight="bold" slot="header">
            <span>Outline Interactive</span>
          </fluent-text>
          <fluent-text block size="200" font="base" weight="regular" block slot="description">
            <span>Fluent Card Appearance</span>
          </fluent-text>
        </fluent-card-header>
      </fluent-card>
      <fluent-card interactive selectable appearance="subtle" orientation="horizontal" class="card--width-360">
        <fluent-card-preview class="full-height">
          <fluent-image class="image-size-64" block shape="square" fit="cover">
            <img
              src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/app_logo.svg"
            />
          </fluent-image>
        </fluent-card-preview>
        <fluent-card-header>
          <fluent-text align="start" font="base" size="300" weight="bold" slot="header">
            <span>Subtle Interactive</span>
          </fluent-text>
          <fluent-text block size="200" font="base" weight="regular" block slot="description">
            <span>Fluent Card Appearance</span>
          </fluent-text>
        </fluent-card-header>
      </fluent-card>
    </div>
  </div>
`);

const toggleSelectionWithFloatingAction = () => {
  const card = document.getElementById('card-selectable-not-interactive') as FluentCard;
  const checkbox = card.querySelector('[role="checkbox"]') as FluentCheckbox;
  if (checkbox && card) {
    card.toggleCardSelection(checkbox.checked);
  }
};

export const SelectableWithFloatingAction = renderComponent(html<CardStoryArgs>`
  <div class="container center flex column">
    <fluent-card orientation="horizontal" selectable id="card-selectable-not-interactive" class="card--width-360">
      <fluent-checkbox
        @change="${toggleSelectionWithFloatingAction}"
        id="card-selectable-checkbox"
        slot="floating-action"
      ></fluent-checkbox>
      <fluent-card-preview class="full-height">
        <fluent-image class="image-size-64" block shape="square">
          <img
            src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/app_logo.svg"
          />
        </fluent-image>
      </fluent-card-preview>
      <fluent-card-header>
        <fluent-text align="start" font="base" size="300" weight="bold" slot="header">
          <span>App Name</span>
        </fluent-text>
        <fluent-text block size="200" font="base" weight="regular" block slot="description">
          <span>Developer</span>
        </fluent-text>
      </fluent-card-header>
    </fluent-card>
  </div>
`);

export const Interactive = renderComponent(html<CardStoryArgs>`
  <div class="container center flex column">
    <fluent-text size="400" weight="semibold"
      ><span>Card click <span id="text-container">0</span> times</span></fluent-text
    >
    <fluent-card
      orientation="horizontal"
      interactive
      @click="${increaseCount}"
      class="card--width-360"
      id="card-interactive"
    >
      <fluent-card-preview class="full-height">
        <fluent-image class="image-size-64" block shape="square">
          <img
            src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/app_logo.svg"
          />
        </fluent-image>
      </fluent-card-preview>
      <fluent-card-header>
        <fluent-text align="start" font="base" size="300" weight="bold" slot="header">
          <span>App Name</span>
        </fluent-text>
        <fluent-text block size="200" font="base" weight="regular" block slot="description">
          <span>Developer</span>
        </fluent-text>
      </fluent-card-header>
    </fluent-card>
  </div>
`);

export const SelectableInteractive = renderComponent(html<CardStoryArgs>`
  <div class="container center flex column">
    <fluent-card id="card-selectable-interactive" selectable interactive class="card--width-360">
      <fluent-card-header>
        <fluent-image class="image-size-40" block slot="image" shape="square">
          <img
            src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/app_logo.svg"
          />
        </fluent-image>
        <fluent-text align="start" font="base" size="300" weight="bold" slot="header">
          <span>App Name</span>
        </fluent-text>
        <fluent-text block size="200" font="base" weight="regular" block slot="description">
          <span>Developer</span>
        </fluent-text>
      </fluent-card-header>
      <fluent-text block size="300" font="base" weight="regular">
        <span
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae urna maximus, faucibus augue at, lacinia
          ipsum.</span
        >
      </fluent-text>
    </fluent-card>
  </div>
`);

export const SelectableInteractiveWithFloatingAction = renderComponent(html<CardStoryArgs>`
  <div class="container center flex">
    <fluent-card
      @onSelectionChanged="${toggleFloatingActionWithInteractiveSelectable}"
      interactive
      selectable
      id="card-interactive-selectable-floating-action"
      class="card--width-360"
    >
      <fluent-checkbox tabindex="-1" slot="floating-action" id="floating-action-checkbox"></fluent-checkbox>
      <fluent-card-header>
        <fluent-image class="image-size-40" block slot="image" shape="square">
          <img
            src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/app_logo.svg"
          />
        </fluent-image>
        <fluent-text align="start" font="base" size="300" weight="bold" slot="header">
          <span>App Name</span>
        </fluent-text>
        <fluent-text block size="200" font="base" weight="regular" block slot="description">
          <span>Developer</span>
        </fluent-text>
      </fluent-card-header>
      <fluent-text block size="300" font="base" weight="regular">
        <span
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae urna maximus, faucibus augue at, lacinia
          ipsum.</span
        >
      </fluent-text>
    </fluent-card>
  </div>
`);

export const FocusMode = renderComponent(html<CardStoryArgs>`
  <div class="container align-start flex column">
    <fluent-text as="h4" align="start" font="base" size="500" weight="bold" align="start">
      <h4>'off' (Default)</h4>
    </fluent-text>
    <fluent-text as="p" align="start" font="base" size="300" align="start">
      <p>The card might still be focusable, but the card won't manage the focus of its contents or be focusable.</p>
    </fluent-text>
    <fluent-card id="card-off" style="width: 420px" size="medium" focus-mode="off">
      <fluent-card-preview class="cover">
        <fluent-image block shape="square">
          <img
            src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/sales_template.png"
          />
        </fluent-image>
      </fluent-card-preview>
      <fluent-card-header>
        <fluent-image class="image-size-40" block slot="image" shape="square">
          <img
            src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/pptx.png"
          />
        </fluent-image>
        <fluent-text align="start" font="base" size="300" weight="bold" slot="header">
          <span>App Name</span>
          <fluent-text align="start" font="base" size="300" weight="regular"><span>mentioned you</span></fluent-text>
        </fluent-text>
        <fluent-text block size="200" font="base" weight="regular" block slot="description">
          <span>Developer</span>
        </fluent-text>
        <fluent-button tabindex="0" slot="action" ?disabled="${x => x.disabled}" icon-only appearance="transparent"
          >${iconEllipsis}</fluent-button
        >
      </fluent-card-header>
      <fluent-text block size="300" font="base" weight="regular">
        <span
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae urna maximus, faucibus augue at, lacinia
          ipsum.</span
        >
      </fluent-text>
      <fluent-card-footer>
        <div>
          <fluent-button appearance="primary" tabindex="0" ?disabled="${x => x.disabled}" icon
            >${iconReply}Reply</fluent-button
          >
          <fluent-button tabindex="0" ?disabled="${x => x.disabled}" icon>${iconShare}Share</fluent-button>
        </div>
      </fluent-card-footer>
    </fluent-card>
    <br />
    <fluent-text as="h4" align="start" font="base" size="500" weight="bold" align="start">
      <h4>'no-tab'</h4>
    </fluent-text>
    <fluent-text as="p" align="start" font="base" size="300" align="start">
      <p>
        The Card will be focusable and trap the focus. You can use Tab to navigate between the contents and escaping
        focus only by pressing the Esc key.
      </p>
    </fluent-text>
    <fluent-card id="card-no-tab" style="width: 420px" size="medium" focus-mode="no-tab">
      <fluent-card-preview class="cover">
        <fluent-image block shape="square">
          <img
            src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/sales_template.png"
          />
        </fluent-image>
      </fluent-card-preview>
      <fluent-card-header>
        <fluent-image class="image-size-40" block slot="image" shape="square">
          <img
            src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/pptx.png"
          />
        </fluent-image>
        <fluent-text align="start" font="base" size="300" weight="bold" slot="header">
          <span>App Name</span>
          <fluent-text align="start" font="base" size="300" weight="regular"><span>mentioned you</span></fluent-text>
        </fluent-text>
        <fluent-text block size="200" font="base" weight="regular" block slot="description">
          <span>Developer</span>
        </fluent-text>
        <fluent-button tabindex="0" slot="action" ?disabled="${x => x.disabled}" icon-only appearance="transparent"
          >${iconEllipsis}</fluent-button
        >
      </fluent-card-header>
      <fluent-text block size="300" font="base" weight="regular">
        <span
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae urna maximus, faucibus augue at, lacinia
          ipsum.</span
        >
      </fluent-text>
      <fluent-card-footer>
        <div>
          <fluent-button appearance="primary" tabindex="0" ?disabled="${x => x.disabled}" icon
            >${iconReply}Reply</fluent-button
          >
          <fluent-button tabindex="0" ?disabled="${x => x.disabled}" icon>${iconShare}Share</fluent-button>
        </div>
      </fluent-card-footer>
    </fluent-card>
    <br />
    <fluent-text as="h4" align="start" font="base" size="500" weight="bold" align="start">
      <h4>'tab-exit'</h4>
    </fluent-text>
    <fluent-text as="p" align="start" font="base" size="300" align="start">
      <p>The Card will be focusable and trap the focus, but release it on an Esc or Tab key press.</p>
    </fluent-text>
    <fluent-card id="card-tab-exit" style="width: 420px" size="medium" focus-mode="tab-exit">
      <fluent-card-preview class="cover">
        <fluent-image block shape="square">
          <img
            src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/sales_template.png"
          />
        </fluent-image>
      </fluent-card-preview>
      <fluent-card-header>
        <fluent-image class="image-size-40" block slot="image" shape="square">
          <img
            src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/pptx.png"
          />
        </fluent-image>
        <fluent-text align="start" font="base" size="300" weight="bold" slot="header">
          <span>App Name</span>
          <fluent-text align="start" font="base" size="300" weight="regular"><span>mentioned you</span></fluent-text>
        </fluent-text>
        <fluent-text block size="200" font="base" weight="regular" block slot="description">
          <span>Developer</span>
        </fluent-text>
        <fluent-button tabindex="0" slot="action" ?disabled="${x => x.disabled}" icon-only appearance="transparent"
          >${iconEllipsis}</fluent-button
        >
      </fluent-card-header>
      <fluent-text block size="300" font="base" weight="regular">
        <span
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae urna maximus, faucibus augue at, lacinia
          ipsum.</span
        >
      </fluent-text>
      <fluent-card-footer>
        <div>
          <fluent-button appearance="primary" tabindex="0" ?disabled="${x => x.disabled}" icon
            >${iconReply}Reply</fluent-button
          >
          <fluent-button tabindex="0" ?disabled="${x => x.disabled}" icon>${iconShare}Share</fluent-button>
        </div>
      </fluent-card-footer>
    </fluent-card>
    <br />
    <fluent-text as="h4" align="start" font="base" size="500" weight="bold" align="start">
      <h4>'tab-only'</h4>
    </fluent-text>
    <fluent-text as="p" align="start" font="base" size="300" align="start">
      <p>The Card will not trap focus but will still be focusable and allow Tab navigation of its contents.</p>
    </fluent-text>
    <fluent-card id="card-tab-only" style="width: 420px" size="medium" focus-mode="tab-only">
      <fluent-card-preview class="cover">
        <fluent-image block shape="square">
          <img
            src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/sales_template.png"
          />
        </fluent-image>
      </fluent-card-preview>
      <fluent-card-header>
        <fluent-image class="image-size-40" block slot="image" shape="square">
          <img
            src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/pptx.png"
          />
        </fluent-image>
        <fluent-text align="start" font="base" size="300" weight="bold" slot="header">
          <span>App Name</span>
          <fluent-text align="start" font="base" size="300" weight="regular"><span>mentioned you</span></fluent-text>
        </fluent-text>
        <fluent-text block size="200" font="base" weight="regular" block slot="description">
          <span>Developer</span>
        </fluent-text>
        <fluent-button tabindex="0" slot="action" ?disabled="${x => x.disabled}" icon-only appearance="transparent"
          >${iconEllipsis}</fluent-button
        >
      </fluent-card-header>
      <fluent-text block size="300" font="base" weight="regular">
        <span
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae urna maximus, faucibus augue at, lacinia
          ipsum.</span
        >
      </fluent-text>
      <fluent-card-footer>
        <div>
          <fluent-button appearance="primary" tabindex="0" ?disabled="${x => x.disabled}" icon
            >${iconReply}Reply</fluent-button
          >
          <fluent-button tabindex="0" ?disabled="${x => x.disabled}" icon>${iconShare}Share</fluent-button>
        </div>
      </fluent-card-footer>
    </fluent-card>
  </div>
`);
