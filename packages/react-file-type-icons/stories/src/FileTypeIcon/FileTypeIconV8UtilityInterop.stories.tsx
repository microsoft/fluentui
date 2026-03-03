import * as React from 'react';
import type { Meta } from '@storybook/react';
import { FileTypeIcon, getFileTypeIconAsUrl, getFileTypeIconProps } from '@fluentui/react-file-type-icons';

export default {
  title: 'Icon/FileTypeIcon',
  component: FileTypeIcon,
} satisfies Meta<typeof FileTypeIcon>;

export const V8UtilityInterop = () => {
  const iconProps = getFileTypeIconProps({ extension: 'docx', size: 16, imageFileType: 'svg' });
  const iconUrl = getFileTypeIconAsUrl({ extension: 'docx', size: 16, imageFileType: 'svg' });

  return (
    <div>
      <div>Utility iconName: {iconProps.iconName}</div>
      <div>Utility URL: {iconUrl}</div>
      <FileTypeIcon extension="docx" size={16} imageFileType="svg" />
    </div>
  );
};
