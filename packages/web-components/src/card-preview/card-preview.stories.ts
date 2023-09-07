import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import './define.js';
import type { CardPreview as FluentCardPreview } from './card-preview.js';

type CardPreviewStoryArgs = Args & FluentCardPreview;
type CardPreviewStoryMeta = Meta<CardPreviewStoryArgs>;

const cardPreviewTemplate = html<CardPreviewStoryArgs>`
  <style>
    #anchor--components-card--appearance .css-jspizm {
      height: 38em;
    }
    #anchor--components-card--size .css-jspizm {
      height: 43em;
    }
    .container-center {
      padding: 48px 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: auto;
      row-gap: 12px;
    }
    .logo {
      height: 32px;
      width: 32px;
      position: absolute;
      left: 12px;
      bottom: 12px;
    }
  </style>
  </script>
  <div class="container-center">
    <fluent-card-preview>
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
  </div>
`;

export default {
  title: 'Components/Card/CardPreview',
  args: {},
  argTypes: {},
} as CardPreviewStoryMeta;

export const CardPreview = renderComponent(cardPreviewTemplate).bind({});
