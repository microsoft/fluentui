import { Switch } from '../index';

import descriptionMd from './SwitchDescription.md';
import bestPracticesMd from './SwitchBestPractices.md';

export * from './SwitchDefault.stories';
export * from './SwitchChecked.stories';
export * from './SwitchDisabled.stories';
export * from './SwitchLabel.stories';
export * from './SwitchLabelWrapping.stories';
export * from './SwitchRequired.stories';
export * from './SwitchThemed.stories';

export default {
  title: 'Preview Components/Switch',
  component: Switch,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
