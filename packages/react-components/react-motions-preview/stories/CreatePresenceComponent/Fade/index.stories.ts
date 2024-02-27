import Description from './Description.md';
import { Fade } from '@fluentui/react-motions-preview';

export { Default } from './Default.stories';
export { OverrideAllDuration } from './OverrideAllDuration.stories';

export default {
  title: 'Utilities/Web Motions (Preview)/Fade',
  component: Fade,
  parameters: {
    docs: {
      description: {
        component: Description,
      },
    },
  },
};
