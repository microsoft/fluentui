import { SearchBox } from '@fluentui/react-search';

import descriptionMd from './SearchBoxDescription.md';
import bestPracticesMd from './SearchBoxBestPractices.md';

export { Default } from './SearchBoxDefault.stories';
export { Appearance } from './SearchBoxAppearance.stories';
export { ContentBeforeAfter } from './SearchBoxContentBeforeAfter.stories';

export default {
  title: 'Preview Components/SearchBox',
  component: SearchBox,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
