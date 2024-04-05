import {
  TagPicker,
  TagPickerControl,
  TagPickerButton,
  TagPickerInput,
  TagPickerList,
  TagPickerOption,
  TagPickerGroup,
} from '@fluentui/react-tag-picker-preview';

import descriptionMd from './TagPickerDescription.md';
import bestPracticesMd from './TagPickerBestPractices.md';

export { Default } from './TagPickerDefault.stories';
export { Button } from './TagPickerButton.stories';
export { Filtering } from './TagPickerFiltering.stories';
export { Size } from './TagPickerSize.stories';
export { Appearance } from './TagPickerAppearance.stories';
export { Disabled } from './TagPickerDisabled.stories';
export { ExpandIcon } from './TagPickerExpandIcon.stories';
export { SecondaryAction } from './TagPickerSecondaryAction.stories';
export { Grouped } from './TagPickerGrouped.stories';
export { Freeform } from './TagPickerFreeform.stories';
export { InteractionTagExample as InteractionTag } from './TagPickerInteractionTag.stories';

export default {
  title: 'Preview Components/Tag Picker',
  component: TagPicker,
  subcomponents: { TagPickerControl, TagPickerGroup, TagPickerButton, TagPickerInput, TagPickerList, TagPickerOption },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
