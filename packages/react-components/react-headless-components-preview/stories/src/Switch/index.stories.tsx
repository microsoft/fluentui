import { Switch } from '@fluentui/react-headless-components-preview';

import descriptionMd from './SwitchDescription.md';

export { Default } from './SwitchDefault.stories';

export default {
  title: 'Headless Components/Switch',
  component: Switch,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
