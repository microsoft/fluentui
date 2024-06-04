import { CardFooter } from '@fluentui/react-components';
import descriptionMd from './CardFooterDescription.md';

export { Default } from './CardFooterDefault.stories';

export default {
  title: 'Components/Card/CardFooter',
  component: CardFooter,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
