import { Popover, PopoverProvider, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';
import { Meta } from '@storybook/react';
import descriptionMd from './PopoverDescription.md';
import bestPracticesMd from './PopoverBestPractices.md';

export { Default } from './PopoverDefault.stories';
export { WithArrow } from './PopoverWithArrow.stories';
export { TrappingFocus } from './PopoverTrappingFocus.stories';
export { ControllingOpenAndClose } from './PopoverControllingOpenAndClose.stories';
export { NestedPopovers } from './PopoverNestedPopovers.stories';
export { AnchorToCustomTarget } from './PopoverAnchorToCustomTarget.stories';
export { CustomTrigger } from './PopoverCustomTrigger.stories';
export { WithoutTrigger } from './PopoverWithoutTrigger.stories';
export { InternalUpdateContent } from './PopoverInternalUpdateContent.stories';
export { Appearance } from './PopoverAppearance.stories';

export default {
  title: 'Components/Popover',
  component: Popover,
  subcomponents: { PopoverTrigger, PopoverSurface, PopoverProvider },
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
