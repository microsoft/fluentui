import { Foobar } from '@fluentui/react-foobar';

import descriptionMd from './FoobarDescription.md';
import bestPracticesMd from './FoobarBestPractices.md';

export { Default } from './FoobarDefault.stories';

export default {
  title: 'Preview Components/Foobar',
  component: Foobar,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
