import { Meta } from '@storybook/react';
import { Dropdown, Listbox, Option } from '@fluentui/react-components';

import descriptionMd from './DropdownDescription.md';
import bestPracticesMd from './DropdownBestPractices.md';
import accessibilityMd from './DropdownAccessibility.md';

export { Default } from './DropdownDefault.stories';
export { Appearance } from './DropdownAppearance.stories';
export { Grouped } from './DropdownGrouped.stories';
export { Clearable } from './DropdownClearable.stories';
export { ComplexOptions } from './DropdownComplexOptions.stories';
export { CustomOptions } from './DropdownCustomOptions.stories';
export { Controlled } from './DropdownControlled.stories';
export { Multiselect } from './DropdownMultiselect.stories';
export { Size } from './DropdownSize.stories';
export { Disabled } from './DropdownDisabled.stories';
export { TruncatedValue } from './DropdownTruncation.stories';
export { ActiveOptionChange } from './DropdownActiveOptionChange.stories';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  subcomponents: {
    Option,
    Listbox,
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd, accessibilityMd].join('\n'),
      },
    },
  },
} as Meta;
