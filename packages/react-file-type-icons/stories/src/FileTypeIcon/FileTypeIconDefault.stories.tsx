import * as React from 'react';
import type { Meta } from '@storybook/react';
import { FileIconType, FileTypeIcon } from '@fluentui/react-file-type-icons';
import descriptionMd from './FileTypeIconDescription.md';

export default {
  title: 'Icon/FileTypeIcon',
  component: FileTypeIcon,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
} satisfies Meta<typeof FileTypeIcon>;

export const Default = () => (
  <div>
    <FileTypeIcon extension="docx" />
    <FileTypeIcon extension="xlsx" size={20} />
    <FileTypeIcon extension="pptx" size={24} />
    <FileTypeIcon type={FileIconType.folder} size={32} imageFileType="png" />
    <FileTypeIcon extension="unknown" size={40} />
  </div>
);
