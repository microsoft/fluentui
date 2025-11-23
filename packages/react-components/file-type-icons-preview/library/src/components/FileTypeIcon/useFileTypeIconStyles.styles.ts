'use client';

import { mergeClasses, makeStyles } from '@griffel/react';
import type { FileTypeIconSlots, FileTypeIconState } from './FileTypeIcon.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const fileTypeIconClassNames: SlotClassNames<FileTypeIconSlots> = {
  root: 'fui-FileTypeIcon',
};

const useStyles = makeStyles({
  // Base styles
  root: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },

  // Size variations - ensure the icon displays at the correct size
  size16: {
    width: '16px',
    height: '16px',
  },
  size20: {
    width: '20px',
    height: '20px',
  },
  size24: {
    width: '24px',
    height: '24px',
  },
  size32: {
    width: '32px',
    height: '32px',
  },
  size40: {
    width: '40px',
    height: '40px',
  },
  size48: {
    width: '48px',
    height: '48px',
  },
  size64: {
    width: '64px',
    height: '64px',
  },
  size96: {
    width: '96px',
    height: '96px',
  },
});

/**
 * Apply styling to the FileTypeIcon slots based on the state.
 */
export const useFileTypeIconStyles_unstable = (state: FileTypeIconState): FileTypeIconState => {
  'use no memo';

  const styles = useStyles();

  state.root.className = mergeClasses(
    fileTypeIconClassNames.root,
    styles.root,
    styles[`size${state.size}`],
    state.root.className,
  );

  return state;
};
