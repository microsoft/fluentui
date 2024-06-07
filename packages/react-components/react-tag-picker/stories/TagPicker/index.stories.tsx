import {
  TagPicker,
  TagPickerControl,
  TagPickerButton,
  TagPickerInput,
  TagPickerList,
  TagPickerOption,
  TagPickerGroup,
} from '@fluentui/react-components';

import descriptionMd from './TagPickerDescription.md';
import bestPracticesMd from './TagPickerBestPractices.md';
import a11yMd from './TagPickerA11y.md';

export { Default } from './TagPickerDefault.stories';
export { Button } from './TagPickerButton.stories';
export { Filtering } from './TagPickerFiltering.stories';
export { Size } from './TagPickerSize.stories';
export { Appearance } from './TagPickerAppearance.stories';
export { Disabled } from './TagPickerDisabled.stories';
export { ExpandIcon } from './TagPickerExpandIcon.stories';
export { SecondaryAction } from './TagPickerSecondaryAction.stories';
export { Grouped } from './TagPickerGrouped.stories';
export { TruncatedText } from './TagPickerTruncatedText.stories';
export { SingleSelect } from './TagPickerSingleSelect.stories';

export default {
  title: 'Components/TagPicker',
  component: TagPicker,
  subcomponents: { TagPickerControl, TagPickerGroup, TagPickerButton, TagPickerInput, TagPickerList, TagPickerOption },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd, a11yMd].join('\n'),
      },
    },
  },
};
