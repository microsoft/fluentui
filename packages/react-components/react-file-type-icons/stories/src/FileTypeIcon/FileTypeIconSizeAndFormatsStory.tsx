import * as React from 'react';
import { FileTypeIcon } from '@fluentui/react-file-type-icons';

export const SizeAndFormats = (): React.ReactElement => (
  <div>
    <div>
      <FileTypeIcon extension="pdf" size={16} imageFileType="svg" /> <span>16 SVG</span>
    </div>
    <div>
      <FileTypeIcon extension="pdf" size={24} imageFileType="svg" /> <span>24 SVG</span>
    </div>
    <div>
      <FileTypeIcon extension="pdf" size={32} imageFileType="png" /> <span>32 PNG</span>
    </div>
    <div>
      <FileTypeIcon extension="pdf" size={48} imageFileType="png" /> <span>48 PNG</span>
    </div>
  </div>
);

SizeAndFormats.parameters = {
  docs: {
    description: {
      story:
        'Step 4: Compare SVG and PNG output at representative sizes. Use SVG by default, and use PNG when your scenario requires bitmap assets.',
    },
  },
};

SizeAndFormats.storyName = '04 Sizes and Formats';
