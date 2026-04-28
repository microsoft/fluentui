import { ToggleButton } from '@fluentui/react-headless-components-preview/toggle-button';

import descriptionMd from './ToggleButtonDescription.md';
import toggleButtonCss from '../../../../../../theme/components/toggle-button.module.css?raw';
import { withCssModuleSource } from '../_helpers/withCssModuleSource';

export { Default } from './ToggleButtonDefault.stories';

export default {
  title: 'Headless Components/ToggleButton',
  component: ToggleButton,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },

    ...withCssModuleSource({ name: 'toggle-button.module.css', source: toggleButtonCss }),
  },
};
