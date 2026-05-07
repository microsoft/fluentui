import { Dropdown, Listbox, Option, OptionGroup } from '@fluentui/react-headless-components-preview/dropdown';

import descriptionMd from './DropdownDescription.md';
import bestPracticesMd from './DropdownBestPractices.md';

export { Default } from './DropdownDefault.stories';
export { Multiselect } from './DropdownMultiselect.stories';
export { Controlled } from './DropdownControlled.stories';
export { Grouped } from './DropdownGrouped.stories';
export { ControllingOpenAndClose } from './DropdownControllingOpenAndClose.stories';
export { Disabled } from './DropdownDisabled.stories';

export default {
  title: 'Headless Components/Dropdown',
  component: Dropdown,
  subcomponents: { Listbox, Option, OptionGroup },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
