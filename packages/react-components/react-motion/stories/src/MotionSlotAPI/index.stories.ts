import type { Meta } from '@storybook/react-webpack5';

import MotionSlotDescription from './MotionSlotDescription.md';
import { MotionSlotDefault } from './MotionSlotDefault.stories';

export { MotionSlotDefault as Default } from './MotionSlotDefault.stories';
export { MotionSlotDisable as Disable } from './MotionSlotDisable.stories';
export { MotionSlotCustomize as Customize } from './MotionSlotCustomize.stories';

export default {
  title: 'Motion/APIs/motionSlot',
  component: MotionSlotDefault,
  parameters: {
    docs: {
      description: {
        component: MotionSlotDescription,
      },
    },
  },
} satisfies Meta;
