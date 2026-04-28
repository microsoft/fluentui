import { SearchBox } from '@fluentui/react-headless-components-preview/search-box';

import descriptionMd from './SearchBoxDescription.md';
import inputCss from '../../../../../../bebop/components/input.module.css?raw';
import { withCssModuleSource } from '../_helpers/withCssModuleSource';

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

    ...withCssModuleSource({ name: 'input.module.css', source: inputCss }),
  },
};
