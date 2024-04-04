import CollapseDescription from './Description.md';
import { Collapse } from '@fluentui/react-motions-preview';

export { Default } from './Default.stories';
export { OverrideAll } from './OverrideAll.stories';
export { OverrideEnter } from './OverrideEnter.stories';
export { OverrideExit } from './OverrideExit.stories';

export default {
  title: 'Utilities/Web Motions (Preview)/Collapse',
  component: Collapse,
  parameters: {
    docs: {
      description: {
        component: CollapseDescription,
      },
    },
  },
};
