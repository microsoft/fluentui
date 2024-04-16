import { SearchBox } from '@fluentui/react-components';

import descriptionMd from './SearchBoxDescription.md';
import bestPracticesMd from './SearchBoxBestPractices.md';

export { Default } from './SearchBoxDefault.stories';
export { Appearance } from './SearchBoxAppearance.stories';
export { ContentBeforeAfter } from './SearchBoxContentBeforeAfter.stories';
export { Disabled } from './SearchBoxDisabled.stories';
export { Placeholder } from './SearchBoxPlaceholder.stories';
export { Size } from './SearchBoxSize.stories';
export { Controlled } from './SearchBoxControlled.stories';

export default {
  title: 'Components/SearchBox',
  component: SearchBox,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
