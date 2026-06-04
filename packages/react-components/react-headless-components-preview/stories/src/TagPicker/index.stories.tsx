import {
  TagPicker,
  TagPickerControl,
  TagPickerGroup,
  TagPickerInput,
  TagPickerButton,
  TagPickerList,
  TagPickerOption,
} from '@fluentui/react-headless-components-preview/tag-picker';

import descriptionMd from './TagPickerDescription.md';

export { Default } from './TagPickerDefault.stories';
export { Filtering } from './TagPickerFiltering.stories';
export { SecondaryAction } from './TagPickerSecondaryAction.stories';
export { Grouped } from './TagPickerGrouped.stories';
export { SingleSelect } from './TagPickerSingleSelect.stories';
export { TruncatedText } from './TagPickerTruncatedText.stories';
export { NoPopover } from './TagPickerNoPopover.stories';

export default {
  title: 'Components/TagPicker',
  component: TagPicker,
  subcomponents: { TagPickerControl, TagPickerGroup, TagPickerInput, TagPickerButton, TagPickerList, TagPickerOption },
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
