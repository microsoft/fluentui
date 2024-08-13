import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import { colorNeutralBackground6 } from '../theme/design-tokens.js';
import type { Text as FluentText } from './text.js';
import { TextAlign, TextFont, TextSize, TextWeight } from './text.options.js';

type TextStoryArgs = Args & FluentText;
type TextStoryMeta = Meta<TextStoryArgs>;

/**
 * Used to generate slotted content for stories
 * @param as - the element to generate
 * @param content - the content for the element
 * @returns ViewTemplate
 */
const generateSemanticElementTemplate = (as: string, content: string) => {
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

//
// Attribute stories
//

export const Nowrap = renderComponent(html<TextStoryArgs>`
  <fluent-text nowrap>
    <div style="display: block; width: 320px; border: 1px solid black;">
      This text will not wrap lines when it overflows the container.
    </div>
  </fluent-text>
`);

export const Truncate = renderComponent(html<TextStoryArgs>`
  <fluent-text truncate nowrap>
    <div style="display: block; width: 320px; border: 1px solid black;">
      Setting <code>truncate</code> and <code>nowrap</code> will truncate when it overflows the container.
    </div>
  </fluent-text>
`);

export const Italic = renderComponent(html<TextStoryArgs>`
  <fluent-text italic>
    <span>Italics are emphasized text.</span>
  </fluent-text>
`);

export const Underline = renderComponent(html<TextStoryArgs>`
  <fluent-text underline>
    <span>Underlined text draws the reader's attention to the words.</span>
  </fluent-text>
`);

export const Strikethrough = renderComponent(html<TextStoryArgs>`
  <fluent-text strikethrough>
    <span>Strikethrough text is used to indicate something that is no longer relevant.</span>
  </fluent-text>
`);

export const Block = renderComponent(html<TextStoryArgs>`
  <span>
    <fluent-text style="background: ${colorNeutralBackground6}"
      ><span>Fluent text is inline by default. Setting</span></fluent-text
    >
    <fluent-text style="background: ${colorNeutralBackground6}" block><span>block</span></fluent-text>
    <fluent-text style="background: ${colorNeutralBackground6}"
      ><span>will make it behave as a block element.</span></fluent-text
    >
  </span>
`);

export const Size = renderComponent(html<TextStoryArgs>`
  <div>
    <fluent-text block size="100"><span>100</span></fluent-text>
    <fluent-text block size="200"><span>200</span></fluent-text>
    <fluent-text block size="300"><span>300</span></fluent-text>
    <fluent-text block size="400"><span>400</span></fluent-text>
    <fluent-text block size="500"><span>500</span></fluent-text>
    <fluent-text block size="600"><span>600</span></fluent-text>
    <fluent-text block size="700"><span>700</span></fluent-text>
    <fluent-text block size="800"><span>800</span></fluent-text>
    <fluent-text block size="900"><span>900</span></fluent-text>
    <fluent-text block size="1000"><span>1000</span></fluent-text>
  </div>
`);

export const Weight = renderComponent(html<TextStoryArgs>`
  <div>
    <fluent-text block weight="regular"><span>This text is regular.</span></fluent-text>
    <fluent-text block weight="medium"><span>This text is medium.</span></fluent-text>
    <fluent-text block weight="semibold"><span>This text is semibold.</span></fluent-text>
    <fluent-text block weight="bold"><span>This text is bold.</span></fluent-text>
  </div>
`);

export const Align = renderComponent(html<TextStoryArgs>`
  <div
    style="display: flex; flex-direction: column; gap: 20px; width: 320px; border-left: 1px solid #000; border-right: 1px solid #000;"
  >
    <fluent-text block align="start">
      <span>Start aligned block.</span>
    </fluent-text>
    <fluent-text block align="end">
      <span>End aligned block.</span>
    </fluent-text>
    <fluent-text block align="center">
      <span>Center aligned block.</span>
    </fluent-text>
    <fluent-text block align="justify">
      <span>Justify aligned block text stretches wrapped lines to meet container edges.</span>
    </fluent-text>
  </div>
`);

export const Font = renderComponent(html<TextStoryArgs>`
  <div>
    <fluent-text block font="base"><span>Font base.</span></fluent-text>
    <fluent-text block font="numeric"><span>Font numeric 0123456789.</span></fluent-text>
    <fluent-text block font="monospace"><span>Font monospace.</span></fluent-text>
  </div>
`);
