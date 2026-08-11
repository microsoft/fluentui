import type { Meta } from '@storybook/react-webpack5';

import description from './CreateStateMotionComponentDescription.md';
import { StateMotionPresence } from './StateMotionPresence.stories';

export { StateMotionPresence as Presence } from './StateMotionPresence.stories';
export { StateMotionMediaPlayer as MediaPlayer } from './StateMotionMediaPlayer.stories';
export { StateMotionCardTransfer as CardTransfer } from './StateMotionCardTransfer.stories';
export { StateMotionAsyncAction as AsyncAction } from './StateMotionAsyncAction.stories';

export default {
  title: 'Motion/APIs/createStateMotionComponent',
  component: StateMotionPresence,
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
} satisfies Meta;
