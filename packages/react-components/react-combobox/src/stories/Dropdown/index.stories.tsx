import { Dropdown } from '@fluentui/react-combobox';

import descriptionMd from './DropdownDescription.md';
import bestPracticesMd from './DropdownBestPractices.md';

export { Default } from './DropdownDefault.stories';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
