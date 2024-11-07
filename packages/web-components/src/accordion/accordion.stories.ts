import { html, repeat } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import type { Accordion as FluentAccordion } from './accordion.js';
import { AccordionExpandMode } from './accordion.options.js';

type Story = StoryObj<FluentAccordion>;

const storyTemplate = html<StoryArgs<FluentAccordion>>`
  <fluent-accordion expand-mode="${story => story.expandmode}">
    ${repeat(
      [
        {
          headingLevel: 2,
          headingSlottedContent: () => html` <span slot="heading">Accordion Header 1</span> `,
          slottedContent: () => 'Accordion Panel 1',
        },
        {
          headingLevel: 2,
          headingSlottedContent: () => html` <span slot="heading">Accordion Header 2</span> `,
          slottedContent: () => 'Accordion Panel 2',
        },
        {
          headingLevel: 2,
          headingSlottedContent: () => html` <span slot="heading">Accordion Header 3</span> `,
          slottedContent: () => 'Accordion Panel 3',
        },
      ],
      html`
        <fluent-accordion-item heading-level="${story => story.headinglevel}" ?disabled="${story => story.disabled}">
          ${story => story.headingSlottedContent?.()} ${story => story.slottedContent?.()}
        </fluent-accordion-item>
      `,
    )}
  </fluent-accordion>
`;

export default {
  title: 'Components/Accordion/Accordion',
  render: renderComponent(storyTemplate),
  argTypes: {
    expandmode: {
      control: 'select',
      description: 'Controls the expand mode of the Accordion, either allowing single or multiple item expansion.',
      name: 'expand-mode',
      options: ['', ...Object.values(AccordionExpandMode)],
      table: {
        category: 'attributes',
        defaultValue: { summary: AccordionExpandMode.multi },
        type: { summary: Object.values(AccordionExpandMode).join('|') },
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
      description: 'The slot for the heading content',
      name: 'heading',
      table: { category: 'slots', type: {} },
    },
  },
} as Meta<FluentAccordion>;

export const Default: Story = {};

export const SingleMode: Story = {
  args: {
    expandmode: AccordionExpandMode.single,
  },
};
