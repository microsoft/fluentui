import { Radio } from '@fluentui/react-components';
import descriptionMd from './RadioDescription.md';

export { Default } from './RadioDefault.stories';

export default {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
