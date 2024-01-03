import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import './define.js';
import { CardAppearance, CardSize } from '../card/card.options.js';
import { fontSizeBase300, fontWeightBold } from '../theme/design-tokens.js';
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
>
  <path
    d="m3.7 9 3.4 3.39a.5.5 0 0 1-.64.76l-.07-.05-4.24-4.25a.5.5 0 0 1-.06-.63l.06-.07L6.39 3.9a.5.5 0 0 1 .76.64l-.05.07L3.7 8H10a7.5 7.5 0 0 1 7.5 7.26v.24a.5.5 0 0 1-1 0A6.5 6.5 0 0 0 10.23 9H3.7l3.4 3.39L3.7 9Z"
    fill="currentColor"
  ></path>
</svg>`;

const iconEllipsis = html` <svg
  fill="currentColor"
  aria-hidden="true"
  width="1em"
  height="1em"
  viewBox="0 0 20 20"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M6.75 10a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0Zm5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0ZM15 11.75a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Z"
    fill="currentColor"
  ></path>
</svg>`;

setTimeout(() => {
  const buttons = document.querySelectorAll('.stop-prop');
  buttons.forEach(button => {
    (button as HTMLButtonElement).addEventListener('keydown', function (event: KeyboardEvent) {
      if (event.key !== 'Tab' && event.key !== 'Escape') {
        event.preventDefault();
        event.stopPropagation();
      } else {
        return true;
      }
    });
  });
}, 1000);

const cardTemplate = html<CardStoryArgs>`
  <style>
    #anchor--components-card--appearance .css-jspizm {
      height: 38em;
    }

    #card-default {
      --card-width: 690px;
    }
    #card-template-preview {
      --card-width: 250px;
      --card-height: 150px;
    }
    .image-size-40 {
      display: block;
      height: 40px;
      width: 40px;
    }
    .image-size-64 {
      display: block;
      height: 64px;
      width: 64px;
    }
    .flex {
      display: flex;
    }
    .gap {
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
      margin: 0 calc(12px * -1);
    }
    .preview-vertical {
      margin: calc(12px * -1) calc(12px * -1) 0 calc(12px * -1);
    }
    .preview-horizontal {
      margin: calc(12px * -1) 0 calc(12px * -1) calc(12px * -1);
    }
    .logo {
      height: 32px;
      width: 32px;
      position: absolute;
      left: 12px;
      bottom: 12px;
    }
    .description-container {
      margin-bottom: 24px;
    }
  .card-header{
    position: relative;
    display: grid;
    column-gap: 12px;
    grid-template-columns: auto 1fr auto;
  }
  .card-header.horizontal {
    position: relative;
    display: grid;
    column-gap: 12px;
    grid-template-columns: auto min-content;
  }
  .card-header .image {
    align-self: center;
  }
  .card-header .header {
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightBold};
  }
  .card-header .action {
    grid-column: 3;
  }
  .card-preview {
    position: relative;
  }
  .card-footer {
    display: grid;
    grid-template-columns: 1fr min-content;
  }

  .card-footer .content {
    display: flex;
    column-gap: 12px;
  }

  .card-orientation-horizontal::part(card) {
    display: grid;
    grid-template-rows: unset;
    row-gap: unset;
    grid-template-columns: auto 1fr;
    align-items: center;
  }

  </style>
  </script>
  <div class="container center flex gap column">
  <fluent-card
      id="card-default"
      appearance="${x => x.appearance}"
      size="${x => x.size}"
    >
      <div class="card-header">
        <fluent-image
          class="image-size-40"
          block
          class="image"
          shape="square"
        >
          <img  src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/avatar_elvia.svg" />

        </fluent-image>
        <div class="header">
          <fluent-text align="start" font="base" size="300" weight="bold">
            <span>Elvia Atkins</span>
            <fluent-text align="start" font="base" size="300" weight="regular"><span>mentioned you</span></fluent-text>
          </fluent-text>
          <fluent-text block size="200" font="base" weight="regular" block slot="description">
            <span>5h ago - About us - Overview</span>
          </fluent-text>
        </div>
        <fluent-button class="stop-prop action" tabindex="0" icon-only appearance="transparent">${iconEllipsis}</fluent-button>
        </div>
      <div class="full-width card-preview">
        <fluent-image
          block
          shape="square"
        >
          <img src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/doc_template.png" />
        </fluent-image>
        <fluent-image
          block
          shape="square"
          class="logo"
        >
          <img src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/docx.png" />
        </fluent-image>
        </div>
      <div class="card-footer">
        <div>
          <fluent-button class="stop-prop" tabindex="0" icon>${iconReply}Reply</fluent-button>
          <fluent-button class="stop-prop" tabindex="0" icon>${iconShare}Share</fluent-button>
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
  },
} as CardStoryMeta;

export const Card = renderComponent(cardTemplate).bind({});

/** Attribute Stories **/

export const Size = renderComponent(html<CardStoryArgs>`
  <div class="description-container flex column gap">
    <fluent-text size="500" weight="bold" align="start" block><h4>Size</h4></fluent-text>
    <fluent-text size="400" align="start" block>
      <p>
        Size options are mainly to provide variety, and consistency when using cards for different usages. It relates to
        padding and border-radius and not so much the actual dimensions of the card.
      </p>
    </fluent-text>
  </div>
  <br />
  <div class="container flex gap column">
    <fluent-text as="h4" align="start" font="base" size="500" weight="semibold" align="start">
      <h4>'small'</h4>
    </fluent-text>
    <fluent-card size="small">
      <div class="card-header">
        <fluent-image class="image-size-40" block slot="image" shape="square">
          <img
            src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/app_logo.svg"
          />
        </fluent-image>
        <div class="header">
          <fluent-text align="start" font="base" size="300" weight="bold" slot="header">
            <span>Small</span>
          </fluent-text>
          <fluent-text block size="200" font="base" weight="regular" block slot="description">
            <span>Fluent Card Size</span>
          </fluent-text>
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
    <br />
    <fluent-text as="h4" align="start" font="base" size="500" weight="semibold" align="start">
      <h4>'medium' (Default)</h4>
    </fluent-text>
    <fluent-card>
      <div class="card-header">
        <fluent-image class="image-size-40" block slot="image" shape="square">
          <img
            src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/app_logo.svg"
          />
        </fluent-image>
        <div class="header">
          <fluent-text align="start" font="base" size="300" weight="bold" slot="header">
            <span>Medium</span>
          </fluent-text>
          <fluent-text block size="200" font="base" weight="regular" block slot="description">
            <span>Fluent Card Size</span>
          </fluent-text>
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
    <br />
    <fluent-text as="h4" align="start" font="base" size="500" weight="semibold" align="start">
      <h4>'large'</h4>
    </fluent-text>
    <fluent-card size="large">
      <div class="card-header">
        <fluent-image class="image-size-40" block slot="image" shape="square">
          <img
            src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/app_logo.svg"
          />
        </fluent-image>
        <div class="header">
          <fluent-text align="start" font="base" size="300" weight="bold" slot="header">
            <span>Large</span>
          </fluent-text>
          <fluent-text block size="200" font="base" weight="regular" block slot="description">
            <span>Fluent Card Size</span>
          </fluent-text>
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

export const Appearance = renderComponent(html<CardStoryArgs>`
  <div class="description-container flex column gap">
    <fluent-text size="500" weight="bold" align="start" block><h4>Appearance</h4></fluent-text>
    <fluent-text size="400" align="start" block>
      <p>Cards can have different styles depending on the situation and where it is placed.</p>
    </fluent-text>
  </div>
  <br />
  <div class="flex gap">
    <div class="container align-start flex gap column">
      <fluent-card class="card-orientation-horizontal">
        <div class="card-preview preview-horizontal">
          <fluent-image class="image-size-64" block shape="square" fit="cover">
            <img
              src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/app_logo.svg"
            />
          </fluent-image>
        </div>
        <div class="card-header horizontal">
          <div class="header">
            <fluent-text align="start" font="base" size="300" weight="bold" slot="header">
              <span>Filled ( default )</span>
            </fluent-text>
            <fluent-text block size="200" font="base" weight="regular" block slot="description">
              <span>Fluent Card</span>
            </fluent-text>
          </div>
          <fluent-button
            class="stop-prop"
            slot="action"
            size="small"
            icon-only
            appearance="transparent"
            aria-label="actions example button"
          >
            ${iconEllipsis}
          </fluent-button>
        </div>
      </fluent-card>
      <fluent-card appearance="filled-alternative" class="card-orientation-horizontal">
        <div class="card-preview preview-horizontal">
          <fluent-image class="image-size-64" block shape="square" fit="cover">
            <img
              src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/app_logo.svg"
            />
          </fluent-image>
        </div>
        <div class="card-header horizontal">
          <div class="header">
            <fluent-text align="start" font="base" size="300" weight="bold" slot="header">
              <span>Filled Alternative</span>
            </fluent-text>
            <fluent-text block size="200" font="base" weight="regular" block slot="description">
              <span>Fluent Card Appearance</span>
            </fluent-text>
          </div>
          <fluent-button
            class="stop-prop"
            slot="action"
            size="small"
            icon-only
            appearance="transparent"
            aria-label="actions example button"
          >
            ${iconEllipsis}
          </fluent-button>
        </div>
      </fluent-card>
      <fluent-card appearance="outline" class="card-orientation-horizontal">
        <div class="card-preview preview-horizontal">
          <fluent-image class="image-size-64" block shape="square" fit="cover">
            <img
              src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/app_logo.svg"
            />
          </fluent-image>
        </div>
        <div class="card-header horizontal">
          <div class="header">
            <fluent-text align="start" font="base" size="300" weight="bold" slot="header">
              <span>Outline</span>
            </fluent-text>
            <fluent-text block size="200" font="base" weight="regular" block slot="description">
              <span>Fluent Card Appearance</span>
            </fluent-text>
          </div>
          <fluent-button
            class="stop-prop"
            slot="action"
            size="small"
            icon-only
            appearance="transparent"
            aria-label="actions example button"
          >
            ${iconEllipsis}
          </fluent-button>
        </div>
      </fluent-card>
      <fluent-card appearance="subtle" class="card-orientation-horizontal">
        <div class="card-preview preview-horizontal">
          <fluent-image class="image-size-64" block shape="square" fit="cover">
            <img
              src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/app_logo.svg"
            />
          </fluent-image>
        </div>
        <div class="card-header horizontal">
          <div class="header">
            <fluent-text align="start" font="base" size="300" weight="bold" slot="header">
              <span>Subtle</span>
            </fluent-text>
            <fluent-text block size="200" font="base" weight="regular" block slot="description">
              <span>Fluent Card Appearance</span>
            </fluent-text>
          </div>
          <fluent-button
            class="stop-prop"
            slot="action"
            size="small"
            icon-only
            appearance="transparent"
            aria-label="actions example button"
          >
            ${iconEllipsis}
          </fluent-button>
        </div>
      </fluent-card>
    </div>
  </div>
`);

export const Templates = renderComponent(html<CardStoryArgs>`
  <div class="description-container flex column gap">
    <fluent-text size="500" weight="bold" align="start" block><h4>Templates</h4></fluent-text>
    <fluent-text size="400" align="start" block>
      <p>Cards can be composed with other components to build rich elements for a page.</p>
    </fluent-text>
  </div>
  <br />
  <div class="flex gap container">
    <div class="column center flex gap">
      <fluent-card>
        <header class="flex gap">
          <fluent-badge shape="square" appearance="tint" color="success">green</fluent-badge>
          <fluent-badge shape="square" appearance="tint" color="brand">blue</fluent-badge>
          <fluent-badge shape="square" appearance="tint" color="danger">red</fluent-badge>
        </header>
        <div class="flex">
          <div>
            <fluent-checkbox></fluent-checkbox>
          </div>
          <div class="flex column">
            <fluent-label weight="semibold">Task Title 1</fluent-label>
            <fluent-text block size="200" font="base" weight="regular">
              <span
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae urna maximus, faucibus augue at,
                lacinia ipsum.</span
              >
            </fluent-text>
          </div>
        </div>
        <div class="flex">
          <div>
            <fluent-checkbox></fluent-checkbox>
          </div>
          <div class="flex column">
            <fluent-label weight="semibold">Task Title 2</fluent-label>
            <fluent-text block size="200" font="base" weight="regular">
              <span
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae urna maximus, faucibus augue at,
                lacinia ipsum.</span
              >
            </fluent-text>
          </div>
        </div>
        <footer class="flex gap">
          <svg
            fill="#C4314B"
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.04 1.3a.5.5 0 0 1 .66-.26A7.8 7.8 0 0 1 15 8.48v.03a.5.5 0 0 1-1-.01v-.05c.02-.34.1-2.16-.93-3.86a7.21 7.21 0 0 0-2.77-2.63.5.5 0 0 1-.26-.66Zm.05 2.41a.5.5 0 0 1 .7-.11s.24.15.52.4a4.51 4.51 0 0 1 1.46 3.19v.06a.5.5 0 0 1-1 0 3.48 3.48 0 0 0-1.56-2.84.5.5 0 0 1-.12-.7Zm-7.55 7a4 4 0 0 1 6.92-4l.82 1.42L12.2 9.5a.5.5 0 0 1-.04.84l-2.53 1.46-2.74 1.58-2.53 1.46a.5.5 0 0 1-.75-.38l-.24-2.34-.82-1.42Zm7.71 1.9-3 1.73a1.75 1.75 0 0 0 3-1.73Z"
              fill="#C4314B"
            ></path>
          </svg>
          <svg
            fill="#0078DB"
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0ZM3 8h10A5 5 0 0 0 3 8Z" fill="#0078DB"></path>
          </svg>
          <div>
            <svg
              fill="currentColor"
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.28 7.97a.5.5 0 0 0 .86.36l4.6-4.6A2.5 2.5 0 0 1 12 5.5a2.5 2.5 0 0 1-.73 1.77l-5.3 5.3a1 1 0 0 1-1.71-.7 1 1 0 0 1 .3-.71l5.3-5.3a.5.5 0 0 0-.7-.7l-5.32 5.29a2 2 0 1 0 2.83 2.83l5.3-5.3A3.49 3.49 0 0 0 9.5 2c-.9 0-1.8.34-2.48 1.02l-4.6 4.6a.5.5 0 0 0-.14.35Z"
                fill="currentColor"
              ></path>
            </svg>
            <span>4</span>
          </div>
          <div>
            <svg
              fill="currentColor"
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2Zm0 1a5 5 0 1 0 0 10A5 5 0 0 0 8 3Zm-.75 6.04 2.87-2.88a.5.5 0 0 1 .77.64l-.06.07L7.6 10.1a.5.5 0 0 1-.63.06l-.07-.06-1.75-1.75a.5.5 0 0 1 .63-.76l.07.06 1.4 1.4 2.87-2.89-2.87 2.88Z"
                fill="currentColor"
              ></path>
            </svg>
            <span>2/12</span>
          </div>
          <svg
            fill="currentColor"
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 4.5A2.5 2.5 0 0 1 3.5 2h9A2.5 2.5 0 0 1 15 4.5v5a2.5 2.5 0 0 1-2.5 2.5H8.69l-3.06 2.68A.98.98 0 0 1 4 13.94V12h-.5A2.5 2.5 0 0 1 1 9.5v-5ZM3.5 3C2.67 3 2 3.67 2 4.5v5c0 .83.67 1.5 1.5 1.5H5v2.9L8.31 11h4.19c.83 0 1.5-.67 1.5-1.5v-5c0-.83-.67-1.5-1.5-1.5h-9Z"
              fill="currentColor"
            ></path>
          </svg>
        </footer>
      </fluent-card>
      <fluent-card size="small">
        <div class="card-header">
          <fluent-image fit="contain" slot="image" shape="square">
            <img
              src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/pptx.png"
            />
          </fluent-image>
          <div class="header">
            <fluent-text align="start" font="base" size="300" weight="bold" slot="header">
              <span>Team Offsite 2020</span>
            </fluent-text>
            <fluent-text block size="200" font="base" weight="regular" block slot="description">
              <span>OneDrive > Presentations</span>
            </fluent-text>
          </div>
          <fluent-button class="stop-prop" tabindex="0" slot="action" icon-only appearance="transparent"
            >${iconEllipsis}</fluent-button
          >
        </div>
      </fluent-card>
      <fluent-card size="small">
        <div class="card-header">
          <fluent-image fit="contain" slot="image" shape="square">
            <img
              src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/xlsx.png"
            />
          </fluent-image>
          <div class="header">
            <fluent-text align="start" font="base" size="300" weight="bold" slot="header">
              <span>Team Budget</span>
            </fluent-text>
            <fluent-text block size="200" font="base" weight="regular" block slot="description">
              <span>OneDrive > Spreadsheets</span>
            </fluent-text>
          </div>
          <fluent-button class="stop-prop" tabindex="0" slot="action" icon-only appearance="transparent"
            >${iconEllipsis}</fluent-button
          >
        </div>
      </fluent-card>
      <fluent-card size="small">
        <div class="card-header">
          <fluent-image fit="contain" slot="image" shape="square">
            <img
              src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/docx.png"
            />
          </fluent-image>
          <div class="header">
            <fluent-text align="start" font="base" size="300" weight="bold" slot="header">
              <span>Secret Project Briefing</span>
            </fluent-text>
            <fluent-text block size="200" font="base" weight="regular" block slot="description">
              <span>OneDrive > Documents</span>
            </fluent-text>
          </div>
          <fluent-button class="stop-prop" tabindex="0" slot="action" icon-only appearance="transparent"
            >${iconEllipsis}</fluent-button
          >
        </div>
      </fluent-card>
    </div>
    <div>
      <fluent-card size="small" id="card-template-preview">
        <div class="card-preview preview-vertical">
          <fluent-image fit="contain" shape="square" fit="cover">
            <img
              src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/intelligence.png"
            />
          </fluent-image>
        </div>
      </fluent-card>
    </div>
  </div>
`);
