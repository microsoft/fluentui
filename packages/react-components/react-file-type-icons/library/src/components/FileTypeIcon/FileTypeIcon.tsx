'use client';

import * as React from 'react';
import { renderFileTypeIcon_unstable } from './renderFileTypeIcon';
import { useFileTypeIcon_unstable } from './useFileTypeIcon';
import { useFileTypeIconStyles_unstable } from './useFileTypeIconStyles.styles';
import type { FileTypeIconProps } from './FileTypeIcon.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * FileTypeIcon component displays an icon representing a file type based on its extension or type.
 * It supports various sizes and image formats (SVG and PNG).
 */
export const FileTypeIcon: ForwardRefComponent<FileTypeIconProps> = React.forwardRef((props, ref) => {
  const state = useFileTypeIcon_unstable(props, ref);

  useFileTypeIconStyles_unstable(state);

  useCustomStyleHook_unstable('useFileTypeIconStyles_unstable')(state);

  return renderFileTypeIcon_unstable(state);
});

FileTypeIcon.displayName = 'FileTypeIcon';
