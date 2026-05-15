import { FileIconType, FileTypeIcon } from '@fluentui/react-file-type-icons';

import descriptionMd from './FileTypeIconDescription.md';

export { Default } from './FileTypeIconDefaultStory';
export { Playground } from './FileTypeIconPlaygroundStory';
export { ByFileIconType } from './FileTypeIconByFileIconTypeStory';
export { SizeAndFormats } from './FileTypeIconSizeAndFormatsStory';
export { FallbackBehavior } from './FileTypeIconFallbackBehaviorStory';
export { CustomBaseUrl } from './FileTypeIconCustomBaseUrlStory';
export { V8UtilityInterop } from './FileTypeIconV8UtilityInteropStory';

export default {
  title: 'Components/FileTypeIcon',
  component: FileTypeIcon,
  argTypes: {
    extension: {
      control: { type: 'text' },
      description: 'File extension to resolve, with or without leading dot.',
    },
    type: {
      control: { type: 'select' },
      options: ['none', 'folder', 'sharedFolder', 'list', 'genericFile', 'docset'],
      mapping: {
        none: undefined,
        folder: FileIconType.folder,
        sharedFolder: FileIconType.sharedFolder,
        list: FileIconType.list,
        genericFile: FileIconType.genericFile,
        docset: FileIconType.docset,
      },
      description: 'Special icon type for non-file entities.',
    },
    size: {
      control: { type: 'select' },
      options: [16, 20, 24, 32, 40, 48, 64, 96],
      description: 'Icon size in pixels.',
    },
    imageFileType: {
      control: { type: 'radio' },
      options: ['svg', 'png'],
      description: 'Asset format to request from the icon set.',
    },
    baseUrl: {
      control: { type: 'text' },
      description: 'Optional custom CDN base URL for icon assets.',
    },
  },
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
