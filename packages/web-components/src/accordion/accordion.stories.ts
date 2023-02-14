import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../__test__/helpers.js';
import { AccordionItemExpandIconPosition, AccordionItemSize } from '../accordion-item/accordion-item.options.js';
import type { Accordion as FluentAccordion } from './accordion.js';
import './define';
import '../accordion-item/define';

type AccordionStoryArgs = Args & FluentAccordion;
type AccordionStoryMeta = Meta<AccordionStoryArgs>;

const storyTemplate = html<AccordionStoryArgs>`
  <fluent-accordion expand-mode=${x => x.expandMode}>
    <fluent-accordion-item
      size=${x => x.size}
      heading-level=${x => x.headingLevel}
      expandIconPosition=${x => x.expandIconPosition}
      block=${x => x.block}
      disabled=${x => x.disabled}
    >
      <span slot="heading">Accordion Header 1</span>
      Accordion Panel 1
    </fluent-accordion-item>
    <fluent-accordion-item
      size=${x => x.size}
      heading-level=${x => x.headingLevel}
      expandIconPosition=${x => x.expandIconPosition}
      block=${x => x.block}
      disabled=${x => x.disabled}
    >
      <span slot="heading">Accordion Header 1</span>
      Accordion Panel 2
    </fluent-accordion-item>
    <fluent-accordion-item
      size=${x => x.size}
      heading-level=${x => x.headingLevel}
      expandIconPosition=${x => x.expandIconPosition}
      block=${x => x.block}
      disabled=${x => x.disabled}
    >
      <span slot="heading">Accordion Header 1</span>
      Accordion Panel 3
    </fluent-accordion-item>
  </fluent-accordion>
`;

export default {
  title: 'Components/Accordion/Default',
  args: {
    size: 'medium',
    expandIconPosition: 'start',
    expandMode: 'multiple',
    block: true,
    disabled: false,
    headingLevel: '2',
  },
  argTypes: {
    size: {
      description: 'Sets the size of the Accordion Item header',
      table: {
        defaultValue: { summary: 'medium' },
      },
      control: {
        type: 'select',
        options: Object.values(AccordionItemSize),
      },
      defaultValue: 'medium',
    },
    expandIconPosition: {
      description: 'Sets position of expand and collapse icon',
      table: {
        defaultValue: { summary: 'start' },
      },
      control: {
        type: 'select',
        options: Object.values(AccordionItemExpandIconPosition),
      },
      defaultValue: 'start',
    },
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
    block: {
      description: 'Sets focus state width',
      table: {
        defaultValue: { summary: true },
      },
      control: 'boolean',
      defaultValue: true,
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
