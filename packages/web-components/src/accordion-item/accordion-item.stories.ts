import { html } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
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
  args: {
    headingSlottedContent: () => html`<span slot="heading">Accordion Item</span>`,
    slottedContent: () => 'Content',
  },
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
      mapping: { '': null, ...AccordionItemSize },
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
      mapping: { '': null, ...AccordionItemMarkerPosition },
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

export const Default: Story = {
  args: {
    expanded: true,
    headinglevel: 2,
    headingSlottedContent: () => html`<span slot="heading">Description</span>`,
    slottedContent: () => html`
      <fluent-text>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacinia bibendum metus, commodo dapibus erat.
          Aliquam venenatis gravida malesuada. Maecenas ut porttitor justo, sed euismod ex. Suspendisse sodales enim
          sem, in auctor risus aliquam ac. Cras ut velit lacinia diam varius fermentum. Sed sed augue tempus, rhoncus
          neque vestibulum, placerat risus.
        </p>
      </fluent-text>
    `,
  },
};
