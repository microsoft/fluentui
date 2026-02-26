'use client';

import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { FileTypeIconSlots, FileTypeIconState } from './FileTypeIcon.types';

export const fileTypeIconClassNames: SlotClassNames<FileTypeIconSlots> = {
  root: 'fui-FileTypeIcon',
};

const useStyles = makeStyles({
  root: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
});

export const useFileTypeIconStyles_unstable = (state: FileTypeIconState): FileTypeIconState => {
  'use no memo';

  const styles = useStyles();

  state.root.className = mergeClasses(fileTypeIconClassNames.root, styles.root, state.root.className);

  return state;
};
