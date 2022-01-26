import { Popover } from '../index';
import { Meta } from '@storybook/react';
import descriptionMd from './PopoverDescription.md';
import bestPracticesMd from './PopoverBestPractices.md';

export { Default } from './PopoverDefault.stories';
export { TrappingFocus } from './PopoverTrappingFocus.stories';
export { ControllingOpenAndClose } from './PopoverControllingOpenAndClose.stories';
export { NestedPopovers } from './PopoverNestedPopovers.stories';
export { AnchorToCustomTarget } from './PopoverAnchorToCustomTarget.stories';
export { CustomTrigger } from './PopoverCustomTrigger.stories';
export { InternalUpdateContent } from './PopoverInternalUpdateContent.stories';

export default {
  title: 'Components/Popover',
  component: Popover,
  argTypes: {
    positioning: {
      control: {
        disable: true,
      },
    },
    defaultOpen: {
      control: {
        disable: true,
      },
    },
    mountNode: {
      control: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
} as Meta;
