import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '@fluentui/react-components';
export { Default } from './AccordionDefault.stories';
export { Collapsible } from './AccordionCollapsible.stories';
export { Controlled } from './AccordionControlled.stories';
export { Multiple } from './AccordionMultiple.stories';
export { OpenItems } from './AccordionOpenItems.stories';
export { Sizes } from './AccordionSizes.stories';
export { HeadingLevels } from './AccordionHeaders.stories';
export { Inline } from './AccordionInline.stories';
export { Disabled } from './AccordionDisabled.stories';
export { ExpandIcon } from './AccordionExpandIcon.stories';
export { ExpandIconPosition } from './AccordionExpandIconPosition.stories';
export { WithIcon } from './AccordionWithIcon.stories';
import descriptionMd from './AccordionDescription.md';

export default {
  title: 'Components/Accordion',
  component: Accordion,
  subcomponents: {
    AccordionItem,
    AccordionHeader,
    AccordionPanel,
  },
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
  argTypes: {
    navigation: {
      defaultValue: undefined,
      control: {
        type: 'select',
        options: [undefined, 'linear', 'circular'],
      },
    },
    multiple: {
      defaultValue: false,
      control: 'boolean',
    },
    collapsible: {
      defaultValue: false,
      control: 'boolean',
    },
    as: {
      control: false,
    },
  },
};
