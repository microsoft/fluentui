import * as React from 'react';
import { FileTypeIcon } from '@fluentui/react-file-type-icons';
import type { FileTypeIconProps } from '@fluentui/react-file-type-icons';

const defaultPlaygroundArgs: FileTypeIconProps = {
  extension: 'docx',
  size: 24,
  imageFileType: 'svg',
};

export const Playground = (args: FileTypeIconProps): React.ReactElement => (
  <div>
    <FileTypeIcon {...args} />
  </div>
);

Playground.args = defaultPlaygroundArgs;

Playground.parameters = {
  docs: {
    description: {
      story:
        'Use controls to quickly validate extension mapping, type mapping, size, and SVG or PNG output. Prefer setting either extension or type; when both are set, extension takes precedence.',
    },
  },
};
