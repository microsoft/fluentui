import { Dropdown, Listbox, Option, OptionGroup } from '@fluentui/react-headless-components-preview/dropdown';

import descriptionMd from './DropdownDescription.md';

import { getBrowserSupportNotice } from '../shared/browserSupportNotice';

export { Default } from './DropdownDefault.stories';
export { Multiselect } from './DropdownMultiselect.stories';
export { Controlled } from './DropdownControlled.stories';
export { Grouped } from './DropdownGrouped.stories';
export { ControllingOpenAndClose } from './DropdownControllingOpenAndClose.stories';
export { Disabled } from './DropdownDisabled.stories';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  subcomponents: { Listbox, Option, OptionGroup },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, getBrowserSupportNotice('Dropdown')].join('\n'),
      },
    },
  },
};
