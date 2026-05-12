import { FileTypeIcon } from '@fluentui/react-file-type-icons';

import descriptionMd from './FileTypeIconDescription.md';

export { Default } from './FileTypeIconDefault';
export { ByFileIconType } from './FileTypeIconByFileIconType';
export { SizeAndFormats } from './FileTypeIconSizeAndFormats';
export { CustomBaseUrl } from './FileTypeIconCustomBaseUrl';
export { V8UtilityInterop } from './FileTypeIconV8UtilityInterop';

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
