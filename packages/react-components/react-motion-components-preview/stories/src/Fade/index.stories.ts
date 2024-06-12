import FadeDescription from './Description.md';
import { Fade } from '@fluentui/react-motion-components-preview';

export { Default } from './Default.stories';
// export { OverrideAll } from './OverrideAll.stories';
// export { OverrideEnter } from './OverrideEnter.stories';
// export { OverrideExit } from './OverrideExit.stories';

export default {
  title: 'Utilities/Motion Components/Presence/Fade',
  component: Fade,
  parameters: {
    docs: {
      description: {
        component: FadeDescription,
      },
    },
  },
};
