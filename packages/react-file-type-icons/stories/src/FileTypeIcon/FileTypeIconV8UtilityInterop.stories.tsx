import * as React from 'react';
import { FileTypeIcon, getFileTypeIconAsUrl, getFileTypeIconProps } from '@fluentui/react-file-type-icons';

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
