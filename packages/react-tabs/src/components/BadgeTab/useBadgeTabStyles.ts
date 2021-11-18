import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { useTabStyles } from '../Tab/useTabStyles';
import type { BadgeTabState } from './BadgeTab.types';

// The overlap of the badge and icon is specified as:
// - the lower-left-hand quarter of the badge
// - overlaps the upper-right-hand third of the icon.
// - the icon remains centered (the badge does not push the icon left)
// To achieve this, a 5x5 grid is used where:
// - the badge occupies columns 4-5 and rows 1,2
// - the icon occupies column 2-4 and rows 2,3,4.
// - the text appears on the last row
const useContentStyles = makeStyles({
  iconBadgeOverlap: {
    display: 'grid',
    flexDirection: 'unset',
    gridTemplateColumns: 'auto auto auto auto auto auto',
    gridTemplateRows: 'auto auto auto auto auto',
    justifyContent: 'center',
    justifyItems: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});

const useBadgeStyles = makeStyles({
  base: theme => ({
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
    marginRight: '8px',
  }),
  verticalContent: {
    margin: '0',
  },
  iconBadgeOverlap: {
    gridRowStart: 1,
    gridRowEnd: 3,
    gridColumnStart: 4,
    gridColumnEnd: 6,
    zIndex: 1,
  },
});

const useIconStyles = makeStyles({
  iconBadgeOverlap: {
    gridRowStart: 2,
    gridRowEnd: 5,
    gridColumnStart: 2,
    gridColumnEnd: 5,
    margin: '0',
  },
});

const useChildrenStyles = makeStyles({
  iconBadgeOverlap: {
    gridRowStart: 5,
    gridRowEnd: 5,
    gridColumnStart: 1,
    gridColumnEnd: 7,
  },
});

/**
 * Apply styling to the BadgeTab slots based on the state
 */
export const useBadgeTabStyles = (state: BadgeTabState): BadgeTabState => {
  useTabStyles(state);

  const contentStyles = useContentStyles();
  const badgeStyles = useBadgeStyles();
  const iconStyles = useIconStyles();
  const childrenStyles = useChildrenStyles();

  state.content.className = mergeClasses(
    state.content.className,
    state.icon && state.verticalContent && contentStyles.iconBadgeOverlap,
  );

  state.badge.className = mergeClasses(
    badgeStyles.base,
    state.verticalContent && badgeStyles.verticalContent,
    state.icon && state.verticalContent && badgeStyles.iconBadgeOverlap,
    state.badge.className,
  );

  if (state.icon && state.verticalContent) {
    state.icon.className = mergeClasses(
      state.icon.className,
      state.icon && state.verticalContent && iconStyles.iconBadgeOverlap,
    );
  }

  if (state.children && state.verticalContent) {
    state.children.className = mergeClasses(childrenStyles.iconBadgeOverlap, state.children.className);
  }

  return state;
};
