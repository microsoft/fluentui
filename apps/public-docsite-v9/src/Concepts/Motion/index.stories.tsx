import description from './MotionDescription.md';
import { Motion } from './utils.stories';

export { Default } from './Default.stories';
export { DisableMotion } from './DisableMotion.stories';
export { CustomMotion } from './CustomMotion.stories';

export default {
  title: 'Concepts/Developer/Motion Components',
  component: Motion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [description].join('\n'),
      },
    },
  },
};
