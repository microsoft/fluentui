import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import './define.js';
import type { CardHeader as FluentCardHeader } from './card-header.js';

type CardHeaderStoryArgs = Args & FluentCardHeader;
type CardHeaderStoryMeta = Meta<CardHeaderStoryArgs>;

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

const cardHeaderTemplate = html<CardHeaderStoryArgs>`
  <style>
    #anchor--components-card--appearance .css-jspizm {
      height: 38em;
    }
    #anchor--components-card--size .css-jspizm {
      height: 43em;
    }
    .image-size-40 {
      height: 40px;
      width: 40px;
    }
    .container-center {
      padding: 48px 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: auto;
      row-gap: 12px;
    }
  </style>
  </script>
  <div class="container-center">
      <fluent-card-header style="width: 360px;">
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
        <fluent-button
            slot="action"
            size="small"
            icon-only
            appearance="transparent"
            aria-label="actions example button"
          >
            ${iconEllipsis}
          </fluent-button>
      </fluent-card-header>
  </div>
`;

export default {
  title: 'Components/Card/CardHeader',
  args: {},
  argTypes: {},
} as CardHeaderStoryMeta;

export const CardHeader = renderComponent(cardHeaderTemplate).bind({});
