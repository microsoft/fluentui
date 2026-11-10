'use client';

import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { TableCellLayoutSlots, TableCellLayoutState } from './TableCellLayout.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { typographyStyles } from '@fluentui/react-theme';

export const tableCellLayoutClassNames: SlotClassNames<TableCellLayoutSlots> = {
  root: 'fui-TableCellLayout',
  media: 'fui-TableCellLayout__media',
  main: 'fui-TableCellLayout__main',
  description: 'fui-TableCellLayout__description',
  content: 'fui-TableCellLayout__content',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    flex: '1 1 0px',
  },

  rootTruncate: {
    overflowX: 'hidden',
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
  },

  contentTruncate: {
    overflowX: 'hidden',
  },

  media: {
    display: 'flex',
    alignItems: 'center',
  },

  mediaExtraSmall: {
    fontSize: '16px',
  },

  mediaSmallAndMedium: {
    fontSize: '20px',
  },

  mediaPrimary: {
    fontSize: '24px',
  },

  mainPrimary: {
    fontWeight: tokens.fontWeightSemibold,
  },

  mainTruncate: {
    overflowX: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  description: {
    color: tokens.colorNeutralForeground2,
    ...typographyStyles.caption1,
  },
});

/**
 * Apply styling to the TableCellLayout slots based on the state
 */
export const useTableCellLayoutStyles_unstable = (state: TableCellLayoutState): TableCellLayoutState => {
  const styles = useStyles();
  const { truncate } = state;

  // eslint-disable-next-line react-hooks/immutability
  state.root.className = mergeClasses(
    tableCellLayoutClassNames.root,
    styles.root,
    truncate && styles.rootTruncate,
    state.root.className,
  );
  const primary = state.appearance === 'primary';

  if (state.media) {
    const mediaSizedStyles = {
      small: styles.mediaSmallAndMedium,
      medium: styles.mediaSmallAndMedium,
      'extra-small': styles.mediaExtraSmall,
    };

    // eslint-disable-next-line react-hooks/immutability
    state.media.className = mergeClasses(
      tableCellLayoutClassNames.media,
      styles.media,
      mediaSizedStyles[state.size],
      primary && styles.mediaPrimary,
      state.media.className,
    );
  }

  if (state.main) {
    // eslint-disable-next-line react-hooks/immutability
    state.main.className = mergeClasses(
      tableCellLayoutClassNames.main,
      truncate && styles.mainTruncate,
      primary && styles.mainPrimary,
      state.main.className,
    );
  }

  if (state.description) {
    // eslint-disable-next-line react-hooks/immutability
    state.description.className = mergeClasses(
      tableCellLayoutClassNames.description,
      styles.description,
      state.description.className,
    );
  }

  if (state.content) {
    // eslint-disable-next-line react-hooks/immutability
    state.content.className = mergeClasses(
      tableCellLayoutClassNames.content,
      styles.content,
      truncate && styles.contentTruncate,
      state.content.className,
    );
  }

  return state;
};
