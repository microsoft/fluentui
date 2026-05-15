import { FileIconType, FileTypeIcon } from '@fluentui/react-file-type-icons';
import type { Meta } from '@storybook/react-webpack5';

import descriptionMd from './FileTypeIconDescription.md';
import bestPracticesMd from './FileTypeIconBestPractices.md';

export { Default } from './FileTypeIconDefault.stories';
export { Playground } from './FileTypeIconPlayground.stories';
export { ByFileIconType } from './FileTypeIconByFileIconType.stories';
export { SizeAndFormats } from './FileTypeIconSizeAndFormats.stories';
export { FallbackBehavior } from './FileTypeIconFallbackBehavior.stories';
export { CustomBaseUrl } from './FileTypeIconCustomBaseUrl.stories';
export { V8UtilityInterop } from './FileTypeIconV8UtilityInterop.stories';

const meta = {
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
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
} satisfies Meta<typeof FileTypeIcon>;

export default meta;
