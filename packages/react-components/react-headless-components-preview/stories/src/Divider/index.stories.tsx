import { Divider } from '@fluentui/react-headless-components-preview';

import descriptionMd from './DividerDescription.md';

export { Default } from './DividerDefault.stories';
export { Vertical } from './DividerVertical.stories';

export default {
  title: 'Headless Components/Divider',
  component: Divider,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
