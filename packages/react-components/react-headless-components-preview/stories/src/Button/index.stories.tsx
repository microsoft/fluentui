import { Button } from '@fluentui/react-headless-components-preview';

import descriptionMd from './ButtonDescription.md';

export { Default } from './ButtonDefault.stories';

export default {
  title: 'Headless Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
