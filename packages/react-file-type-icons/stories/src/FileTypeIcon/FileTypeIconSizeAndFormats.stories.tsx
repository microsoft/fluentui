import * as React from 'react';
import { FileTypeIcon } from '@fluentui/react-file-type-icons';

export const SizeAndFormats = (): React.ReactElement => (
  <div>
    <FileTypeIcon extension="pdf" size={16} imageFileType="svg" />
    <FileTypeIcon extension="pdf" size={24} imageFileType="svg" />
    <FileTypeIcon extension="pdf" size={32} imageFileType="png" />
    <FileTypeIcon extension="pdf" size={48} imageFileType="png" />
  </div>
);
