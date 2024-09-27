import { html } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import { colorNeutralBackground6 } from '../theme/design-tokens.js';
import type { Text as FluentText } from './text.js';
import { TextAlign, TextFont, TextSize, TextWeight } from './text.options.js';

type Story = StoryObj<FluentText>;

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

const storyTemplate = html<StoryArgs<FluentText>>`
  <fluent-text
    align=${story => story.align}
    font=${story => story.font}
    size=${story => story.size}
    weight=${story => story.weight}
    ?nowrap=${story => story.nowrap}
    ?truncate=${story => story.truncate}
    ?italic=${story => story.italic}
    ?underline=${story => story.underline}
    ?strikethrough=${story => story.strikethrough}
    ?block=${story => story.block}
    >${story => story.slottedContent?.()}</fluent-text
  >
`;

export default {
  title: 'Components/Text',
  render: renderComponent(storyTemplate),
  args: {
    slottedContent: () => html`${story => generateSemanticElementTemplate(story.as, 'text')}`,
  },
  argTypes: {
    as: {
      control: 'select',
      mapping: { '': null, ...['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'span'] },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'span'],
      table: {
        category: 'attributes',
        type: { summary: Object.values(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'span']).join('|') },
      },
    },
    size: {
      control: 'select',
      description: 'Indicates the size of the text.',
      mapping: { '': null, ...TextSize },
      options: ['', ...Object.values(TextSize)],
      table: {
        category: 'attributes',
        type: { summary: Object.values(TextSize).join('|') },
      },
    },
    weight: {
      description: 'Indicates the weight of the text.',
      mapping: { '': null, ...TextWeight },
      options: ['', ...Object.values(TextWeight)],
      table: {
        category: 'attributes',
        type: { summary: Object.values(TextWeight).join('|') },
      },
    },
    align: {
      description: 'Indicates the alignment of the text.',
      mapping: { '': null, ...TextAlign },
      options: ['', ...Object.values(TextAlign)],
      table: {
        category: 'attributes',
        type: { summary: Object.values(TextAlign).join('|') },
      },
    },
    font: {
      description: 'Indicates the font family of the text.',
      mapping: { '': null, ...TextFont },
      options: ['', ...Object.values(TextFont)],
      table: {
        category: 'attributes',
        type: { summary: Object.values(TextFont).join('|') },
      },
    },
    nowrap: {
      control: 'boolean',
      description: 'Indicates if the text is set to no-wrap.',
      name: 'nowrap',
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
    truncate: {
      control: 'boolean',
      description: 'Indicates if the text should truncate.',
      name: 'truncate',
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
    italic: {
      control: 'boolean',
      description: 'Indicates if the text is set to italic.',
      name: 'italic',
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
    underline: {
      control: 'boolean',
      description: 'Indicates if the text is set to underline.',
      name: 'underline',
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
    strikethrough: {
      control: 'boolean',
      description: 'Indicates if the text is set to strikethrough.',
      name: 'strikethrough',
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
    block: {
      control: 'boolean',
      description: 'Indicates if the text is set to block.',
      name: 'block',
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
    slottedContent: {
      control: false,
      description: 'The default slot',
      name: '',
      table: { category: 'slots', type: {} },
    },
  },
} as Meta<FluentText>;

export const Text: Story = {};

//
// Attribute stories
//

export const Nowrap: Story = {
  render: renderComponent(html<StoryArgs<FluentText>>`
    <fluent-text nowrap>
      <div style="display: block; width: 320px; border: 1px solid black;">
        This text will not wrap lines when it overflows the container.
      </div>
    </fluent-text>
  `),
};

export const Truncate: Story = {
  render: renderComponent(html<StoryArgs<FluentText>>`
    <fluent-text truncate nowrap>
      <div style="display: block; width: 320px; border: 1px solid black;">
        Setting <code>truncate</code> and <code>nowrap</code> will truncate when it overflows the container.
      </div>
    </fluent-text>
  `),
};

export const Italic: Story = {
  render: renderComponent(html<StoryArgs<FluentText>>`
    <fluent-text italic>
      <span>Italics are emphasized text.</span>
    </fluent-text>
  `),
};

export const Underline: Story = {
  render: renderComponent(html<StoryArgs<FluentText>>`
    <fluent-text underline>
      <span>Underlined text draws the reader's attention to the words.</span>
    </fluent-text>
  `),
};

export const Strikethrough: Story = {
  render: renderComponent(html<StoryArgs<FluentText>>`
    <fluent-text strikethrough>
      <span>Strikethrough text is used to indicate something that is no longer relevant.</span>
    </fluent-text>
  `),
};

export const Block: Story = {
  render: renderComponent(html<StoryArgs<FluentText>>`
    <span>
      <fluent-text style="background: ${colorNeutralBackground6}"
        ><span>Fluent text is inline by default. Setting</span></fluent-text
      >
      <fluent-text style="background: ${colorNeutralBackground6}" block><span>block</span></fluent-text>
      <fluent-text style="background: ${colorNeutralBackground6}"
        ><span>will make it behave as a block element.</span></fluent-text
      >
    </span>
  `),
};

export const Size: Story = {
  render: renderComponent(html<StoryArgs<FluentText>>`
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
  `),
};

export const Weight: Story = {
  render: renderComponent(html<StoryArgs<FluentText>>`
    <div>
      <fluent-text block weight="regular"><span>This text is regular.</span></fluent-text>
      <fluent-text block weight="medium"><span>This text is medium.</span></fluent-text>
      <fluent-text block weight="semibold"><span>This text is semibold.</span></fluent-text>
      <fluent-text block weight="bold"><span>This text is bold.</span></fluent-text>
    </div>
  `),
};

export const Align: Story = {
  render: renderComponent(html<StoryArgs<FluentText>>`
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
  `),
};

export const Font: Story = {
  render: renderComponent(html<StoryArgs<FluentText>>`
    <div>
      <fluent-text block font="base"><span>Font base.</span></fluent-text>
      <fluent-text block font="numeric"><span>Font numeric 0123456789.</span></fluent-text>
      <fluent-text block font="monospace"><span>Font monospace.</span></fluent-text>
    </div>
  `),
};
