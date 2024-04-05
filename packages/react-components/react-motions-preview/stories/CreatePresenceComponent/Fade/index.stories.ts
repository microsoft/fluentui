import FadeDescription from './Description.md';
import { Fade } from '@fluentui/react-motions-preview';

export { Default } from './Default.stories';
// export { OverrideAll } from './OverrideAll.stories';
// export { OverrideEnter } from './OverrideEnter.stories';
// export { OverrideExit } from './OverrideExit.stories';

export default {
  title: 'Utilities/Web Motions (Preview)/Fade',
  component: Fade,
  parameters: {
    docs: {
      description: {
        component: FadeDescription,
      },
    },
  },
};
