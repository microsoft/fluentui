import { Switch } from '../index';

import descriptionMd from './SwitchDescription.md';
import bestPracticesMd from './SwitchBestPractices.md';

export { Default } from './SwitchDefault.stories';
export { Checked } from './SwitchChecked.stories';
export { Disabled } from './SwitchDisabled.stories';
export { Label } from './SwitchLabel.stories';
export { LabelWrapping } from './SwitchLabelWrapping.stories';
export { Required } from './SwitchRequired.stories';
export { Themed } from './SwitchThemed.stories';

export default {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
