import { CardHeader } from '@fluentui/react-components';
import descriptionMd from './CardHeaderDescription.md';

export { Default } from './CardHeaderDefault.stories';

export default {
  title: 'Components/Card/CardHeader',
  component: CardHeader,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
