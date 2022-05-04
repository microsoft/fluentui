import { RadioGroup } from '../index';
import bestPracticesMd from './RadioGroupBestPractices.md';
import descriptionMd from './RadioGroupDescription.md';

export { Default } from './RadioGroupDefault.stories';
export { Labeled } from './RadioGroupLabeled.stories';
export { Horizontal } from './RadioGroupHorizontal.stories';
export { HorizontalStacked } from './RadioGroupHorizontalStacked.stories';
export { ControlledValue } from './RadioGroupControlledValue.stories';
export { UncontrolledValue } from './RadioGroupUncontrolledValue.stories';
export { Required } from './RadioGroupRequired.stories';
export { Disabled } from './RadioGroupDisabled.stories';
export { DisabledItem } from './RadioGroupDisabledItem.stories';
export { LabelSubtext } from './RadioGroupLabelSubtext.stories';

export default {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
