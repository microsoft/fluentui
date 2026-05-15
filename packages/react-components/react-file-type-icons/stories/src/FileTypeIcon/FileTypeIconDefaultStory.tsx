import * as React from 'react';
import { FileIconType, FileTypeIcon } from '@fluentui/react-file-type-icons';

export const Default = (): React.ReactElement => (
  <div>
    <div>
      <FileTypeIcon extension="docx" /> <span>.docx default size</span>
    </div>
    <div>
      <FileTypeIcon extension="xlsx" size={20} /> <span>.xlsx compact list size</span>
    </div>
    <div>
      <FileTypeIcon extension="pptx" size={24} /> <span>.pptx standard list size</span>
    </div>
    <div>
      <FileTypeIcon type={FileIconType.folder} size={32} imageFileType="png" /> <span>folder by type using PNG</span>
    </div>
  </div>
);

Default.parameters = {
  docs: {
    description: {
      story: 'Quick overview of common component usage with extension-based and type-based icon resolution.',
    },
  },
};
