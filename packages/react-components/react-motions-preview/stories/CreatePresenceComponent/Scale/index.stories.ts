import ScaleDescription from './Description.md';
import { Scale } from '@fluentui/react-motions-preview';

export { Default } from './Default.stories';
// export { OverrideAll } from './OverrideAll.stories';
export { Custom } from './Custom.stories';

export default {
  title: 'Utilities/Web Motions (Preview)/Presence Components/Scale',
  component: Scale,
  parameters: {
    docs: {
      description: {
        component: ScaleDescription,
      },
    },
  },
};
