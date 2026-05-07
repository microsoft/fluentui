import { Combobox, Listbox, Option, OptionGroup } from '@fluentui/react-headless-components-preview/combobox';

import descriptionMd from './ComboboxDescription.md';

export { Default } from './ComboboxDefault.stories';
export { Controlled } from './ComboboxControlled.stories';
export { Freeform } from './ComboboxFreeform.stories';
export { Grouped } from './ComboboxGrouped.stories';
export { Multiselect } from './ComboboxMultiselect.stories';
export { ControllingOpenAndClose } from './ComboboxControllingOpenAndClose.stories';
export { Disabled } from './ComboboxDisabled.stories';

export default {
  title: 'Headless Components/Combobox',
  component: Combobox,
  subcomponents: { Listbox, Option, OptionGroup },
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
