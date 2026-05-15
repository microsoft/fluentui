import * as React from 'react';
import { FileIconType, FileTypeIcon } from '@fluentui/react-file-type-icons';

const columnStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  columnGap: 12,
  rowGap: 8,
  alignItems: 'center',
};

export const Default = (): React.ReactElement => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 32, rowGap: 16 }}>
    <div>
      <h4 style={{ margin: '0 0 8px' }}>Extensions and types</h4>
      <div style={columnStyle}>
        <FileTypeIcon extension="docx" />
        <span>Microsoft Word document (16px, default)</span>
        <FileTypeIcon extension="xlsx" size={20} />
        <span>Microsoft Excel spreadsheet (20px)</span>
        <FileTypeIcon extension="pptx" size={24} />
        <span>Microsoft PowerPoint presentation (24px)</span>
        <FileTypeIcon type={FileIconType.folder} size={32} />
        <span>Folder (FileIconType.folder)</span>
        <FileTypeIcon type={FileIconType.sharedFolder} size={64} />
        <span>Shared folder (FileIconType.sharedFolder)</span>
        <FileTypeIcon type={FileIconType.list} size={96} />
        <span>List (FileIconType.list)</span>
      </div>
    </div>
    <div>
      <h4 style={{ margin: '0 0 8px' }}>Sizes and formats</h4>
      <div style={columnStyle}>
        <FileTypeIcon extension="pdf" size={16} imageFileType="svg" />
        <span>16px SVG</span>
        <FileTypeIcon extension="pdf" size={24} imageFileType="svg" />
        <span>24px SVG</span>
        <FileTypeIcon extension="pdf" size={32} imageFileType="png" />
        <span>32px PNG</span>
        <FileTypeIcon extension="pdf" size={48} imageFileType="png" />
        <span>48px PNG</span>
      </div>
      <h4 style={{ margin: '16px 0 8px' }}>Fallback</h4>
      <div style={columnStyle}>
        <FileTypeIcon extension="unknown" size={24} />
        <span>Unknown or empty extension falls back to the generic file icon</span>
      </div>
    </div>
  </div>
);

Default.parameters = {
  docs: {
    description: {
      story:
        'Overview of extension- and type-based usage alongside size and format variations. Prefer SVG for crisp rendering; use PNG when bitmap assets are required.',
    },
  },
};

Default.storyName = 'Default';
