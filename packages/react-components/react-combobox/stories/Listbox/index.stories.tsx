import { Meta } from '@storybook/react';
import { Listbox, Option } from '@fluentui/react-components';

import descriptionMd from './ListboxDescription.md';

export { Default } from './ListboxDefault.stories';
export { Filtering } from './ListboxFiltering.stories';
export { InDialog } from './ListboxInDialog.stories';

export default {
  title: 'Components/Listbox',
  component: Listbox,
  subcomponents: {
    Option,
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
} as Meta;
