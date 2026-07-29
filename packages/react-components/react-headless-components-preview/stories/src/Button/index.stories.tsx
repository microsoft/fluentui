import { Button } from '@fluentui/react-headless-components-preview/button';

import descriptionMd from './ButtonDescription.md';
export { Default } from './ButtonDefault.stories';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
