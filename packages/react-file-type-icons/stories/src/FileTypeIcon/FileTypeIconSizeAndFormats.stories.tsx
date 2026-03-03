import * as React from 'react';
import type { Meta } from '@storybook/react';
import { FileTypeIcon } from '@fluentui/react-file-type-icons';

export default {
  title: 'Compat Components/FileTypeIcon',
  component: FileTypeIcon,
} satisfies Meta<typeof FileTypeIcon>;

export const SizeAndFormats = () => (
  <div>
    <FileTypeIcon extension="pdf" size={16} imageFileType="svg" />
    <FileTypeIcon extension="pdf" size={24} imageFileType="svg" />
    <FileTypeIcon extension="pdf" size={32} imageFileType="png" />
    <FileTypeIcon extension="pdf" size={48} imageFileType="png" />
  </div>
);
