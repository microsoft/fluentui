import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from '@fluentui/react-headless-components-preview/accordion';

import descriptionMd from './AccordionDescription.md';
import accordionCss from '../../../../../../theme/components/accordion.module.css?raw';
import { withCssModuleSource } from '../_helpers/withCssModuleSource';

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

    ...withCssModuleSource({ name: 'accordion.module.css', source: accordionCss }),
  },
};
