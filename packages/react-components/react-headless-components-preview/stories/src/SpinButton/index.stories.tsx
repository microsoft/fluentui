import { SpinButton } from '@fluentui/react-headless-components-preview';

import descriptionMd from './SpinButtonDescription.md';

export { Default } from './SpinButtonDefault.stories';

export default {
  title: 'Headless Components/SpinButton',
  component: SpinButton,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
