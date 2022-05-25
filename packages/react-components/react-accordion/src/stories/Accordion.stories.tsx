import { Accordion } from '../Accordion';
export { Default } from './AccordionDefault.stories';
export { Collapsible } from './AccordionCollapsible.stories';
export { Multiple } from './AccordionMultiple.stories';
export { Navigation } from './AccordionNavigation.stories';
export { OpenItems } from './AccordionOpenItems.stories';
export { Sizes } from './AccordionSizes.stories';
export { HeadingLevels } from './AccordionHeaders.stories';
export { Inline } from './AccordionInline.stories';
export { Disabled } from './AccordionDisabled.stories';
export { ExpandIcon } from './AccordionExpandIcon.stories';
export { ExpandIconPosition } from './AccordionExpandIconPosition.stories';
export { WithIcon } from './AccordionWithIcon.stories';
import descriptionMd from '../AccordionDescription.md';

export default {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
  argTypes: {
    inline: {
      defaultValue: false,
      control: 'boolean',
    },
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
    icon: {
      defaultValue: false,
      control: 'boolean',
    },
    size: {
      defaultValue: 'medium',
      control: {
        type: 'select',
        options: ['small', 'medium', 'large', 'extra-large'],
      },
    },
    as: {
      control: false,
    },
    index: {
      control: false,
    },
    defaultIndex: {
      control: false,
    },
    expandIconPosition: {
      defaultValue: 'start',
      control: {
        type: 'inline-radio',
        options: ['start', 'end'],
      },
    },
  },
};
