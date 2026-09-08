import { html, repeat } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import { getStorybookHelpers } from '../../.storybook/wc-toolkit-helpers.js';
import type { Accordion as FluentAccordion } from './accordion.js';
import { AccordionExpandMode } from './accordion.options.js';

type Story = StoryObj<FluentAccordion>;
const { argTypes } = getStorybookHelpers<FluentAccordion>('fluent-accordion');

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
  argTypes,
} as Meta<FluentAccordion>;

export const Default: Story = {};

export const SingleMode: Story = {
  args: {
    expandmode: AccordionExpandMode.single,
  },
};
