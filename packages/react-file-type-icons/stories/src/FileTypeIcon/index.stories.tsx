import { FileTypeIcon } from '@fluentui/react-file-type-icons';

import descriptionMd from './FileTypeIconDescription.md';

export { Default } from './FileTypeIconDefault.stories';
export { ByFileIconType } from './FileTypeIconByFileIconType.stories';
export { SizeAndFormats } from './FileTypeIconSizeAndFormats.stories';
export { CustomBaseUrl } from './FileTypeIconCustomBaseUrl.stories';
export { V8UtilityInterop } from './FileTypeIconV8UtilityInterop.stories';

export default {
  title: 'Icons/FileTypeIcon',
  component: FileTypeIcon,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
