import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import './define.js';
import type { CardFooter as FluentCardFooter } from './card-footer.js';

type CardFooterStoryArgs = Args & FluentCardFooter;
type CardFooterStoryMeta = Meta<CardFooterStoryArgs>;

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

const cardFooterTemplate = html<CardFooterStoryArgs>`
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
  </style>
  </script>
  <div class="container-center">
      <fluent-card-footer style="width: 360px;">
        <div>
          <fluent-button icon>${iconReply}Reply</fluent-button>
          <fluent-button icon>${iconShare}Share</fluent-button>
        </div>
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
      </fluent-card-footer>
  </div>
`;

export default {
  title: 'Components/Card/CardFooter',
  args: {},
  argTypes: {},
} as CardFooterStoryMeta;

export const CardFooter = renderComponent(cardFooterTemplate).bind({});
