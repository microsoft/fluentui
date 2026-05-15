import * as React from 'react';
import { FileIconType, FileTypeIcon } from '@fluentui/react-file-type-icons';

export const ByFileIconType = (): React.ReactElement => (
  <div>
    <div>
      <FileTypeIcon type={FileIconType.folder} size={20} /> <span>folder</span>
    </div>
    <div>
      <FileTypeIcon type={FileIconType.sharedFolder} size={24} /> <span>sharedFolder</span>
    </div>
    <div>
      <FileTypeIcon type={FileIconType.list} size={32} /> <span>list</span>
    </div>
    <div>
      <FileTypeIcon type={FileIconType.campaign} size={40} /> <span>campaign</span>
    </div>
  </div>
);

ByFileIconType.parameters = {
  docs: {
    description: {
      story:
        'Use FileIconType when rendering non-file entities, such as folders or list-like objects, where extension lookup is not applicable.',
    },
  },
};
