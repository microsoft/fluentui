import { SearchBox } from '@fluentui/react-headless-components-preview/search-box';

import descriptionMd from './SearchBoxDescription.md';

export { Default } from './SearchBoxDefault.stories';

export default {
  title: 'Headless Components/SearchBox',
  component: SearchBox,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
