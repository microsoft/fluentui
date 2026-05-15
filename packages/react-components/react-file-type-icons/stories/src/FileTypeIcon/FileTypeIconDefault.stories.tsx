import * as React from 'react';
import { FileIconType, FileTypeIcon } from '@fluentui/react-file-type-icons';

export const Default = (): React.ReactElement => (
  <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 12, rowGap: 8, alignItems: 'center' }}>
    <FileTypeIcon extension="docx" />
    <span>Microsoft Word document (smallest size is 16px)</span>
    <FileTypeIcon extension="xlsx" size={20} />
    <span>Microsoft Excel spreadsheet (compact list size is 20px)</span>
    <FileTypeIcon extension="pptx" size={24} />
    <span>Microsoft PowerPoint presentation (standard list size is 24px)</span>
    <FileTypeIcon type={FileIconType.folder} size={32} imageFileType="png" />
    <span>Folder icon (PNG format, size is 32px)</span>
  </div>
);

Default.parameters = {
  docs: {
    description: {
      story: 'Start here for a quick overview of extension-based and type-based usage.',
    },
  },
};

Default.storyName = 'Default';
