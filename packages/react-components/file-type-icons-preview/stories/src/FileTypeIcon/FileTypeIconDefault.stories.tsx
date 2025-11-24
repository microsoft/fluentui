import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { FileTypeIcon } from '@fluentui/file-type-icons-preview';
import type { FileTypeIconProps } from '@fluentui/file-type-icons-preview';

export const Default = (args: FileTypeIconProps): JSXElement => <FileTypeIcon {...args} />;

Default.args = {
  extension: 'docx',
  size: 48,
  imageFileType: 'svg',
};
