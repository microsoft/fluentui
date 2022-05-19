import { Select } from '../Select';
import selectDescription from '../SelectDescription.md';

import bestPracticesMd from './SelectBestPractices.md';

export { Default } from './SelectDefault.stories';
export { Appearance } from './SelectAppearance.stories';
export { Controlled } from './SelectControlled.stories';
export { Disabled } from './SelectDisabled.stories';
export { InitialValue } from './SelectInitialValue.stories';
export { Inline } from './SelectInline.stories';
export { Size } from './SelectSize.stories';

export default {
  title: 'Components/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component: [selectDescription, bestPracticesMd].join('\n'),
      },
    },
  },
};
