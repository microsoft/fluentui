import type { Meta } from '@storybook/react-webpack5';

import PresenceMotionSlotDescription from './PresenceMotionSlotDescription.md';
import { PresenceMotionSlotDefault } from './PresenceMotionSlotDefault.stories';

export { PresenceMotionSlotDefault as Default } from './PresenceMotionSlotDefault.stories';
export { PresenceMotionSlotDisable as Disable } from './PresenceMotionSlotDisable.stories';
export { PresenceMotionSlotCustomize as Customize } from './PresenceMotionSlotCustomize.stories';

export default {
  title: 'Motion/APIs/presenceMotionSlot',
  component: PresenceMotionSlotDefault,
  parameters: {
    docs: {
      description: {
        component: PresenceMotionSlotDescription,
      },
    },
  },
} satisfies Meta;
