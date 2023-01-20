import { Meta } from '@storybook/react';
import { Dropdown } from '@fluentui/react-combobox';

import descriptionMd from './DropdownDescription.md';
import bestPracticesMd from './DropdownBestPractices.md';
import accessibilityMd from './DropdownAccessibility.md';

export { Default } from './DropdownDefault.stories';
export { Appearance } from './DropdownAppearance.stories';
export { Grouped } from './DropdownGrouped.stories';
export { ComplexOptions } from './DropdownComplexOptions.stories';
export { CustomOptions } from './DropdownCustomOptions.stories';
export { Multiselect } from './DropdownMultiselect.stories';
export { Size } from './DropdownSize.stories';
export { Disabled } from './DropdownDisabled.stories';

export default {
  title: 'Preview Components/Dropdown',
  component: Dropdown,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd, accessibilityMd].join('\n'),
      },
    },
  },
} as Meta;
