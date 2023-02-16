import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Text as FluentText } from './text.js';
import './define.js';
import { TextAlign, TextFont, TextSize, TextWeight } from './text.options.js';

type TextStoryArgs = Args & FluentText;
type TextStoryMeta = Meta<TextStoryArgs>;

/**
 * Used to generate slotted content for stories
 * @param as - the element to generate
 * @param content - the content for the element
 * @returns ViewTemplate
 */
const generateSemanticElementTemplate = (as: string, content) => {
  switch (as) {
    case 'h1':
      return html`<h1>${content}</h1>`;
    case 'h2':
      return html`<h2>${content}</h2>`;
    case 'h3':
      return html`<h3>${content}</h3>`;
    case 'h4':
      return html`<h4>${content}</h4>`;
    case 'h5':
      return html`<h5>${content}</h5>`;
    case 'h6':
      return html`<h6>${content}</h6>`;
    case 'p':
      return html`<p>${content}</p>`;
    case 'pre':
      return html`<pre>${content}</pre>`;
    case 'span':
    default:
      return html`<span>${content}</span>`;
  }
};

const storyTemplate = html<TextStoryArgs>`
  <fluent-text
    align=${x => x.align}
    font=${x => x.font}
    size=${x => x.size}
    weight=${x => x.weight}
    ?nowrap=${x => x.nowrap}
    ?truncate=${x => x.truncate}
    ?italic=${x => x.italic}
    ?underline=${x => x.underline}
    ?strikethrough=${x => x.strikethrough}
    ?block=${x => x.block}
    >${x => generateSemanticElementTemplate(x.as, x.content)}</fluent-text
  >
`;

export default {
  title: 'Components/Text',
  args: {
    content: 'Text',
    nowrap: false,
    truncate: false,
    italic: false,
    underline: false,
    strikethrough: false,
    block: false,
  },
  argTypes: {
    as: {
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'span'],
      control: {
        type: 'select',
      },
    },
    size: {
      options: Object.values(TextSize),
      control: {
        type: 'select',
      },
    },
    weight: {
      options: Object.keys(TextWeight),
      control: {
        type: 'select',
      },
    },
    align: {
      options: Object.keys(TextAlign),
      control: {
        type: 'select',
      },
    },
    font: {
      options: Object.keys(TextFont),
      control: {
        type: 'select',
      },
    },
    nowrap: {
      control: 'boolean',
    },
    truncate: {
      control: 'boolean',
    },
    italic: {
      control: 'boolean',
    },
    underline: {
      control: 'boolean',
    },
    strikethrough: {
      control: 'boolean',
    },
    block: {
      control: 'boolean',
    },
  },
} as TextStoryMeta;

export const Text = renderComponent(storyTemplate).bind({});
