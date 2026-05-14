import { Switch } from '@fluentui/react-headless-components-preview/switch';

import descriptionMd from './SwitchDescription.md';
export { Default } from './SwitchDefault.stories';

export default {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
