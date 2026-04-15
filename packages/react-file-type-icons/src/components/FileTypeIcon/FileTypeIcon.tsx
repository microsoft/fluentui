'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { FileTypeIconProps } from './FileTypeIcon.types';
import { renderFileTypeIcon_unstable } from './renderFileTypeIcon_unstable';
import { useFileTypeIcon_unstable } from './useFileTypeIcon_unstable';
import { useFileTypeIconStyles_unstable } from './useFileTypeIconStyles.styles';

/**
 * FileTypeIcon renders a file type icon as an image resolved from the file extension or type.
 */
export const FileTypeIcon: ForwardRefComponent<FileTypeIconProps> = React.forwardRef((props, ref) => {
  const state = useFileTypeIcon_unstable(props, ref);

  useFileTypeIconStyles_unstable(state);

  return renderFileTypeIcon_unstable(state);
});

FileTypeIcon.displayName = 'FileTypeIcon';
