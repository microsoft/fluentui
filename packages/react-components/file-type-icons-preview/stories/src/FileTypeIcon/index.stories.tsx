import { FileTypeIcon } from '@fluentui/file-type-icons-preview';
import type { Meta } from '@storybook/react';

export { Default } from './FileTypeIconDefault.stories';
export { CommonFileTypes } from './FileTypeIconCommon.stories';
export { UrlAndHtml } from './FileTypeIconUrlAndHtml.stories';
export { BestPractices } from './FileTypeIconBestPractices.stories';
export { Accessibility } from './FileTypeIconAccessibility.stories';
export { EdgeCases } from './FileTypeIconEdgeCases.stories';

import descriptionMd from './FileTypeIconDescription.md';

export default {
  title: 'Icons/Filetype Icons',
  component: FileTypeIcon,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: [16, 20, 24, 32, 40, 48, 64, 96],
      description: 'The size of the icon in pixels',
      table: {
        type: { summary: '16 | 20 | 24 | 32 | 40 | 48 | 64 | 96' },
        defaultValue: { summary: '48' },
      },
    },
    extension: {
      control: { type: 'text' },
      description: 'The file extension (without the dot)',
      table: {
        type: { summary: 'string' },
      },
    },
    type: {
      control: { type: 'select' },
      options: ['folder', 'genericFile', 'sharedFolder', 'listItem', 'docset'],
      description: 'Special icon type (alternative to extension)',
      table: {
        type: { summary: 'FileIconType' },
      },
    },
    imageFileType: {
      control: { type: 'radio' },
      options: ['svg', 'png'],
      description: 'The image format to use',
      table: {
        type: { summary: "'svg' | 'png'" },
        defaultValue: { summary: "'svg'" },
      },
    },
  },
} as Meta;
