import { ToggleButton } from '@fluentui/react-headless-components-preview/toggle-button';

import descriptionMd from './ToggleButtonDescription.md';

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
  },
};
