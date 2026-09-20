import { Switch } from '@fluentui/react-modern-components-preview/switch';

import descriptionMd from './SwitchDescription.md';
import bestPracticesMd from './SwitchBestPractices.md';

export { Default } from './SwitchDefault.stories';
export { Checked } from './SwitchChecked.stories';
export { Size } from './SwitchSize.stories';
export { Disabled } from './SwitchDisabled.stories';
export { Label } from './SwitchLabel.stories';
export { LabelWrapping } from './SwitchLabelWrapping.stories';
export { Required } from './SwitchRequired.stories';

export default {
  title: 'Components/Switch/Switch',
  component: Switch,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
