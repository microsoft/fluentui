/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { FileTypeIconSlots, FileTypeIconState } from './FileTypeIcon.types';

/**
 * Render the final JSX of FileTypeIcon.
 */
export const renderFileTypeIcon_unstable = (state: FileTypeIconState): JSXElement => {
  assertSlots<FileTypeIconSlots>(state);

  return <state.root />;
};
