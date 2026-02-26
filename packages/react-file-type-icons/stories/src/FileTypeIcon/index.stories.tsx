import { FileTypeIcon } from '@fluentui/react-file-type-icons';

import descriptionMd from './FileTypeIconDescription.md';

export { Default } from './FileTypeIconDefault.stories';

export default {
  title: 'Compat Components/FileTypeIcon',
  component: FileTypeIcon,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
