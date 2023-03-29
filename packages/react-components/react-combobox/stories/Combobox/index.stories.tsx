import { Meta } from '@storybook/react';
import { Combobox } from '@fluentui/react-combobox';

import descriptionMd from './ComboboxDescription.md';
import bestPracticesMd from './ComboboxBestPractices.md';

export { Default } from './ComboboxDefault.stories';
export { ComplexOptions } from './ComboboxComplexOptions.stories';
export { CustomOptions } from './ComboboxCustomOptions.stories';
export { Controlled } from './ComboboxControlled.stories';
export { Filtering } from './ComboboxFiltering.stories';
export { Freeform } from './ComboboxFreeform.stories';
export { Multiselect } from './ComboboxMultiselect.stories';
export { MultiselectWithTags } from './ComboboxMultiselectWithTags.stories';
export { MultiselectWithValueString } from './ComboboxMultiselectWithValueString.stories';
export { Grouped } from './ComboboxGrouped.stories';
export { Appearance } from './ComboboxAppearance.stories';
export { Size } from './ComboboxSize.stories';
export { Disabled } from './ComboboxDisabled.stories';

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
