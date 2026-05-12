import * as React from 'react';
import { assertSlots, getSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { FileTypeIconSlots, FileTypeIconState } from './FileTypeIcon.types';

/**
 * Render the final JSX of FileTypeIcon.
 */
export const renderFileTypeIcon_unstable = (state: FileTypeIconState): JSXElement => {
  assertSlots<FileTypeIconSlots>(state);
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const { slots, slotProps } = getSlots<FileTypeIconSlots>(state);

  return React.createElement(slots.root, slotProps.root);
};
