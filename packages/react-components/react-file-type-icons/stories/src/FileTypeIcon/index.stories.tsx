import { FileIconType, FileTypeIcon } from '@fluentui/react-file-type-icons';
import type { Meta } from '@storybook/react-webpack5';

import descriptionMd from './FileTypeIconDescription.md';
import bestPracticesMd from './FileTypeIconBestPractices.md';

export { Default } from './FileTypeIconDefault.stories';
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
      options: ['none', 'folder', 'sharedFolder', 'list', 'genericFile'],
      mapping: {
        none: undefined,
        folder: FileIconType.folder,
        sharedFolder: FileIconType.sharedFolder,
        list: FileIconType.list,
        genericFile: FileIconType.genericFile,
      },
      description:
        'Special icon type for non-file entities (folder, list, etc.). Pass a [`FileIconType`](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-file-type-icons/library/src/FileIconType.ts) value to render the icon for items without a file extension.',
      table: {
        type: {
          summary: 'FileIconType',
          detail: [
            'docset = 1',
            'folder = 2',
            'genericFile = 3',
            'listItem = 4',
            'sharedFolder = 5',
            'multiple = 6',
            'stream = 7',
            'news = 8',
            'desktopFolder = 9',
            'documentsFolder = 10',
            'picturesFolder = 11',
            'linkedFolder = 12',
            'list = 13',
            'form = 14',
            'sway = 15',
            'playlist = 16',
            'loopworkspace = 17',
            'planner = 18',
            'todoItem = 19',
            'portfolio = 20',
            'album = 21',
            'listForm = 22',
            'campaign = 23',
            'shortcutsdefaultfolder = 24',
          ].join('\n'),
        },
      },
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
