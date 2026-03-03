import * as React from 'react';
import { FileIconType, FileTypeIcon } from '@fluentui/react-file-type-icons';

export const Default = () => (
  <div>
    <FileTypeIcon extension="docx" />
    <FileTypeIcon extension="xlsx" size={20} />
    <FileTypeIcon extension="pptx" size={24} />
    <FileTypeIcon type={FileIconType.folder} size={32} imageFileType="png" />
    <FileTypeIcon extension="unknown" size={40} />
  </div>
);
