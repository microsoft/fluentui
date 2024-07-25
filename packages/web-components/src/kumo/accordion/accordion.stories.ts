import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../../helpers.stories.js';
import type { Accordion as KumoAccordion } from '../../accordion/accordion.js';

type AccordionStoryArgs = Args & KumoAccordion;
type AccordionStoryMeta = Meta<AccordionStoryArgs>;

const storyTemplate = html<AccordionStoryArgs>`
  <kumo-accordion expand-mode=${x => x.expandMode}>
    <kumo-accordion-item heading-level=${x => x.headingLevel} ?disabled=${x => x.disabled}>
      <span slot="heading">Accordion Header 1</span>
      Accordion Panel 1
    </kumo-accordion-item>
    <kumo-accordion-item heading-level=${x => x.headingLevel} ?disabled=${x => x.disabled}>
      <span slot="heading">Accordion Header 2</span>
      Accordion Panel 2
    </kumo-accordion-item>
    <kumo-accordion-item heading-level=${x => x.headingLevel} ?disabled=${x => x.disabled}>
      <span slot="heading">Accordion Header 3</span>
      Accordion Panel 3
    </kumo-accordion-item>
  </kumo-accordion>
`;

export default {
  title: 'Components/Kumo/Accordion',
  args: {
    expandMode: 'multiple',
    disabled: false,
    headingLevel: '2',
  },
  argTypes: {
    expandMode: {
      description: 'Sets whether multiple or a single accordion item can be expanded at one time',
      table: {
        defaultValue: { summary: 'multiple' },
      },
      control: {
        type: 'select',
        options: ['multiple', 'single'],
      },
      defaultValue: 'multiple',
    },
    disabled: {
      description: 'Sets disabled state on Accordion Item',
      table: {
        defaultValue: { summary: false },
      },
      control: 'boolean',
      defaultValue: false,
    },
    headingLevel: {
      description: 'Sets `aria-level` attribute on Accordion Item heading',
      table: {
        defaultValue: { summary: '2' },
      },
      control: {
        type: 'select',
        options: ['1', '2', '3', '4', '5', '6'],
      },
      defaultValue: '2',
    },
  },
} as AccordionStoryMeta;

export const Accordion = renderComponent(storyTemplate).bind({});
