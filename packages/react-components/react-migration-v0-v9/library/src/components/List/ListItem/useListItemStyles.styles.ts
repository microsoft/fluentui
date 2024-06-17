import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, makeResetStyles, mergeClasses } from '@griffel/react';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import type { ListItemSlots, ListItemState } from './ListItem.types';
import { tokens } from '@fluentui/react-theme';

export const listItemClassNames: SlotClassNames<ListItemSlots> = {
  root: 'fui-ListItem',
  media: 'fui-ListItem__media',
  header: 'fui-ListItem__header',
  contentWrapper: 'fui-ListItem__contentWrapper',
  headerMedia: 'fui-ListItem__headerMedia',
  contentMedia: 'fui-ListItem__contentMedia',
  endMedia: 'fui-ListItem__endMedia',
};

const useRootBaseStyles = makeResetStyles({
  padding: '0 10px',
  margin: 0,
  textIndent: 0,
  listStyleType: 'none',
  ...createCustomFocusIndicatorStyle(
    {
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      borderRadius: `var(--2925, var(--2926, ${tokens.borderRadiusMedium}))`,
    },
    { selector: 'focus' },
  ),
});

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  contentWrapper: {
    fontSize: `var(--2927, var(--2928, ${tokens.fontSizeBase200}))`,
  },

  // The content should go all the way to the end if the content media is not present
  contentWrapperWithoutMedia: {
    gridColumnEnd: 4,
  },
  truncate: {
    overflow: 'hidden',
    textWrap: 'nowrap',
    textOverflow: 'ellipsis',
  },
  rootSelected: {
    backgroundColor: `var(--2929, var(--2930, ${tokens.colorNeutralBackground1Selected}))`,
  },
  rootClickable: {
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: `var(--2931, var(--2932, ${tokens.colorNeutralBackground1Hover}))`,
    },
  },
});

/**
 * Apply styling to the ListItem slots based on the state
 */
export const useListItemStyles_unstable = (state: ListItemState): ListItemState => {
  'use no memo';

  const rootBaseStyles = useRootBaseStyles();
  const styles = useStyles();

  state.root.className = mergeClasses(
    listItemClassNames.root,
    rootBaseStyles,
    (state.selectable || state.navigable) && styles.rootClickable,
    state.selected && styles.rootSelected,
    state.root.className,
  );

  if (state.header) {
    state.header.className = mergeClasses(state.truncateHeader && styles.truncate, state.header?.className);
  }

  if (state.contentWrapper) {
    state.contentWrapper.className = mergeClasses(
      styles.contentWrapper,
      state.truncateContent && styles.truncate,
      !state.contentMedia && styles.contentWrapperWithoutMedia,
      state.contentWrapper?.className,
    );
  }

  return state;
};
