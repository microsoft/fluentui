import { CardFooter } from '../../index';
import descriptionMd from './CardFooterDescription.md';

export { Default } from './CardFooterDefault.stories';

export default {
  title: 'Preview Components/Card/CardFooter',
  component: CardFooter,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
