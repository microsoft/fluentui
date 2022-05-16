import { Meta } from '@storybook/react';
import { Combobox } from '../index';

import descriptionMd from './ComboboxDescription.md';
import bestPracticesMd from './ComboboxBestPractices.md';

export { Default } from './ComboboxDefault.stories';
export { CustomOptions } from './ComboboxCustomOptions.stories';
export { Multiselect } from './ComboboxMultiselect.stories';
export { Grouped } from './ComboboxGrouped.stories';
export { Appearance } from './ComboboxAppearance.stories';
export { Size } from './ComboboxSize.stories';

export default {
  title: 'Components/Combobox',
  component: Combobox,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
} as Meta;
