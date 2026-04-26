import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '@fluentui/react-headless-components-preview';

import descriptionMd from './AccordionDescription.md';

export { Default } from './AccordionDefault.stories';
export { Collapsible } from './AccordionCollapsible.stories';

export default {
  title: 'Headless Components/Accordion',
  component: Accordion,
  subcomponents: { AccordionHeader, AccordionItem, AccordionPanel },
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
