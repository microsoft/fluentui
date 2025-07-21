import { makeStyles, mergeClasses } from '@griffel/react';
import { tableCellLayoutClassNames, type TableCellLayoutState } from '@fluentui/react-table';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import * as semanticTokens from '@fluentui/semantic-tokens';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: semanticTokens.gapInsideCtrlDefault,
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
    fontWeight: semanticTokens.textStyleDefaultHeaderWeight,
  },

  mainTruncate: {
    overflowX: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  description: {
    color: semanticTokens.foregroundContentNeutralSecondary,
    fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
    fontSize: semanticTokens.textGlobalCaption1FontSize,
    fontWeight: semanticTokens.textStyleDefaultRegularWeight,
    lineHeight: semanticTokens.textGlobalCaption1LineHeight,
  },
});

/**
 * Apply styling to the TableCellLayout slots based on the state
 */
export const useSemanticTableCellLayoutStyles = (_state: unknown): TableCellLayoutState => {
  'use no memo';

  const state = _state as TableCellLayoutState;

  const styles = useStyles();
  const { truncate } = state;

  state.root.className = mergeClasses(
    state.root.className,
    tableCellLayoutClassNames.root,
    styles.root,
    truncate && styles.rootTruncate,
    getSlotClassNameProp_unstable(state.root),
  );
  const primary = state.appearance === 'primary';

  if (state.media) {
    const mediaSizedStyles = {
      small: styles.mediaSmallAndMedium,
      medium: styles.mediaSmallAndMedium,
      'extra-small': styles.mediaExtraSmall,
    };

    state.media.className = mergeClasses(
      state.media.className,
      tableCellLayoutClassNames.media,
      styles.media,
      mediaSizedStyles[state.size],
      primary && styles.mediaPrimary,
      getSlotClassNameProp_unstable(state.media),
    );
  }

  if (state.main) {
    state.main.className = mergeClasses(
      state.main.className,
      tableCellLayoutClassNames.main,
      truncate && styles.mainTruncate,
      primary && styles.mainPrimary,
      getSlotClassNameProp_unstable(state.main),
    );
  }

  if (state.description) {
    state.description.className = mergeClasses(
      state.description.className,
      tableCellLayoutClassNames.description,
      styles.description,
      getSlotClassNameProp_unstable(state.description),
    );
  }

  if (state.content) {
    state.content.className = mergeClasses(
      state.content.className,
      tableCellLayoutClassNames.content,
      styles.content,
      truncate && styles.contentTruncate,
      getSlotClassNameProp_unstable(state.content),
    );
  }

  return state;
};
