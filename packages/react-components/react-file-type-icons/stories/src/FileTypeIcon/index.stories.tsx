import { FileTypeIcon } from '@fluentui/react-file-type-icons';

import descriptionMd from './FileTypeIconDescription.md';

export { Default } from './FileTypeIconDefaultStory';
export { ByFileIconType } from './FileTypeIconByFileIconTypeStory';
export { SizeAndFormats } from './FileTypeIconSizeAndFormatsStory';
export { CustomBaseUrl } from './FileTypeIconCustomBaseUrlStory';
export { V8UtilityInterop } from './FileTypeIconV8UtilityInteropStory';

export default {
  title: 'Components/FileTypeIcon',
  component: FileTypeIcon,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
