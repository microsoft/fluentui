import type { Meta } from '@storybook/react-webpack5';
import { Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-modern-components-preview/popover';
import descriptionMd from './PopoverDescription.md';
import bestPracticesMd from './PopoverBestPractices.md';

export { Default } from './PopoverDefault.stories';
export { NonInteractiveContent } from './PopoverNonInteractiveContent.stories';
export { WithArrow } from './PopoverWithArrow.stories';
export { TrappingFocus } from './PopoverTrappingFocus.stories';
export { ControllingOpenAndClose } from './PopoverControllingOpenAndClose.stories';
export { NestedPopovers } from './PopoverNestedPopovers.stories';
export { AnchorToCustomTarget } from './PopoverAnchorToCustomTarget.stories';
export { CustomTrigger } from './PopoverCustomTrigger.stories';
export { WithoutTrigger } from './PopoverWithoutTrigger.stories';
export { InternalUpdateContent } from './PopoverInternalUpdateContent.stories';
export { Appearance } from './PopoverAppearance.stories';
export { MotionCustom } from './PopoverMotionCustom.stories';
export { MotionDisabled } from './PopoverMotionDisabled.stories';

export default {
  title: 'Components/Popover/Popover',
  component: Popover,
  subcomponents: { PopoverTrigger, PopoverSurface },
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
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
} as Meta;
