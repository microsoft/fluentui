import { useFocusFinders } from '@fluentui/react-components';
import descriptionMd from './useFocusFindersDescription.md';

export { Default } from './Default.stories';
export { FindFirst } from './FindFirst.stories';
export { FindLast } from './FindLast.stories';
export { FindAllWhere } from './FindAllWhere.stories';
export { FindNext } from './FindNext.stories';
export { FindPrevious } from './FindPrevious.stories';

export default {
  title: 'Utilities/Focus Management/useFocusFinders',
  component: useFocusFinders,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
