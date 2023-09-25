import { fluentAccordion } from './index';

export default {
  title: 'Components/Accordion',
  component: fluentAccordion,
  argTypes: {
    expandMode: {
      options: ['single', 'multi'],
      control: { type: 'radio' },
      defaultValue: 'multi',
    },
  },
};

const AccordionTemplate = ({ expandMode }) => `
  <fluent-accordion
    ${expandMode ? `expand-mode="${expandMode}"` : ''}
  >
    <fluent-accordion-item expanded>
      <div slot="start">
        <button>1</button>
      </div>
      <div slot="end">
        <button>1</button>
      </div>
      <span slot="heading">Panel one</span>
      Panel one content
    </fluent-accordion-item>
    <fluent-accordion-item>
      <span slot="heading">Panel two</span>
      Panel two content
    </fluent-accordion-item>
    <fluent-accordion-item expanded>
      <span slot="heading">Panel three</span>
      Panel three content
    </fluent-accordion-item>
  </fluent-accordion>
`;

export const Accordion = AccordionTemplate.bind({});

const example = `
<fluent-accordion>
  <fluent-accordion-item expanded>
    <div slot="start">
      <button>1</button>
    </div>
    <div slot="end">
      <button>1</button>
    </div>
    <span slot="heading">Panel one</span>
    Panel one content
  </fluent-accordion-item>
  <fluent-accordion-item>
    <span slot="heading">Panel two</span>
    Panel two content
  </fluent-accordion-item>
  <fluent-accordion-item expanded>
    <span slot="heading">Panel three</span>
    Panel three content
  </fluent-accordion-item>
</fluent-accordion>
`;

Accordion.parameters = {
  docs: {
    source: {
      code: example,
    },
  },
};
