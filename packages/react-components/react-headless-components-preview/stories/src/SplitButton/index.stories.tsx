import { SplitButton } from '@fluentui/react-headless-components-preview/split-button';

import descriptionMd from './SplitButtonDescription.md';

export { Default } from './SplitButtonDefault.stories';

export default {
  title: 'Components/SplitButton',
  component: SplitButton,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
