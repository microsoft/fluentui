import { html } from '@microsoft/fast-element';
import { type NewMeta as Meta, renderComponent, StoryArgs, type StoryObj } from '../helpers.stories.js';
import type { AccordionItem as FluentAccordionItem } from './accordion-item.js';
import { AccordionItemMarkerPosition, AccordionItemSize } from './accordion-item.options.js';

type Story = StoryObj<FluentAccordionItem>;

const storyTemplate = html<StoryArgs<FluentAccordionItem>>`
  <fluent-accordion-item
    heading-level="${story => story.headinglevel}"
    marker-position="${story => story.markerPosition}"
    size="${story => story.size}"
    ?disabled="${story => story.disabled}"
    ?expanded="${story => story.expanded}"
    ?block="${story => story.block}"
  >
    ${story => story.headingSlottedContent?.()} ${story => story.slottedContent?.()}
  </fluent-accordion-item>
`;

export default {
  title: 'Components/Accordion/AccordionItem',
  render: renderComponent(storyTemplate),
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables the accordion item.',
      table: {
        category: 'attributes',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    expanded: {
      control: 'boolean',
      description: 'Expands or collapses the item.',
      table: {
        category: 'attributes',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    headinglevel: {
      control: { type: 'number', min: 1, max: 6 },
      name: 'heading-level',
      description: 'Configures the level of the heading element.',
      table: {
        category: 'attributes',
        defaultValue: { summary: '2' },
      },
    },
    size: {
      control: 'select',
      description: 'Controls the size of the Accordion Item.',
      name: 'size',
      options: ['', ...Object.values(AccordionItemSize)],
      table: {
        category: 'attributes',
        type: { summary: Object.values(AccordionItemSize).join('|') },
      },
    },
    markerPosition: {
      control: 'select',
      description: 'Controls the position of the marker.',
      name: 'marker-position',
      options: ['', ...Object.values(AccordionItemMarkerPosition)],
      table: {
        category: 'attributes',
        type: { summary: Object.values(AccordionItemMarkerPosition).join('|') },
      },
    },
    block: {
      control: 'boolean',
      description: 'Sets the width of the focus state.',
      table: {
        category: 'attributes',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    slottedContent: {
      control: false,
      description: 'The default slot',
      name: '',
      table: { category: 'slots', type: {} },
    },
    headingSlottedContent: {
      control: false,
      description: 'The content to be placed in the heading.',
      name: 'heading',
      table: { category: 'slots', type: {} },
    },
  },
} as Meta<FluentAccordionItem>;

export const AccordionItem: Story = {
  args: {
    expanded: true,
    headinglevel: 2,
    headingSlottedContent: () => html`<span slot="heading">Description</span>`,
    slottedContent: () => html`
      <fluent-text>
        <p>
          Chalk is a soft, white, porous, sedimentary carbonate rock, a form of limestone composed of the mineral
          calcite. Calcite is an ionic salt called calcium carbonate or CaCO3. It forms under reasonably deep marine
          conditions from the gradual accumulation of minute calcite shells shed from micro-organisms called
          coccolithophores. Flint is very common as bands parallel to the bedding or as nodules embedded in chalk.
        </p>
      </fluent-text>
    `,
  },
};
