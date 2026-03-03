import * as React from 'react';
import type { Meta } from '@storybook/react';
import { FileIconType, FileTypeIcon } from '@fluentui/react-file-type-icons';

export default {
  title: 'Icon/FileTypeIcon',
  component: FileTypeIcon,
} satisfies Meta<typeof FileTypeIcon>;

export const ByFileIconType = () => (
  <div>
    <FileTypeIcon type={FileIconType.folder} size={20} />
    <FileTypeIcon type={FileIconType.sharedFolder} size={24} />
    <FileTypeIcon type={FileIconType.list} size={32} />
    <FileTypeIcon type={FileIconType.campaign} size={40} />
  </div>
);
