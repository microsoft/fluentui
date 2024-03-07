import CollapseDescription from './CollapseDescription.md';
import { Collapse } from '@fluentui/react-motions-preview';

export { Default } from './CollapseDefault.stories';
export { OverrideAllDuration } from './CollapseOverrideAllDuration.stories';
export { OverrideAllEasing } from './CollapseOverrideAllEasing.stories';
export { OverrideEnterDuration } from './CollapseOverrideEnterDuration.stories';
export { OverrideExitDuration } from './CollapseOverrideExitDuration.stories';

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
