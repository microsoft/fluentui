import * as React from 'react';
import { FileIconType, FileTypeIcon } from '@fluentui/react-file-type-icons';

export const ByFileIconType = () => (
  <div>
    <FileTypeIcon type={FileIconType.folder} size={20} />
    <FileTypeIcon type={FileIconType.sharedFolder} size={24} />
    <FileTypeIcon type={FileIconType.list} size={32} />
    <FileTypeIcon type={FileIconType.campaign} size={40} />
  </div>
);
