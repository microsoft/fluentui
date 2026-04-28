import { Switch } from '@fluentui/react-headless-components-preview/switch';

import descriptionMd from './SwitchDescription.md';
import switchCss from '../../../../../../theme/components/switch.module.css?raw';
import { withCssModuleSource } from '../_helpers/withCssModuleSource';

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

    ...withCssModuleSource({ name: 'switch.module.css', source: switchCss }),
  },
};
