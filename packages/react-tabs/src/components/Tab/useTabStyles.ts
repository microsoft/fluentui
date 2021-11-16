import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';

import type { TabState } from './Tab.types';

export const tabClassName = 'fui-Tab';
const contentClassName = `${tabClassName}-content`;

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: theme => ({
    background: 'none',
    borderColor: 'none',
    borderRadius: '4px',
    borderWidth: '2px',
    cursor: 'pointer',
    fontFamily: theme.fontFamilyBase,
    fontSize: theme.fontSizeBase300,
    lineHeight: theme.lineHeightBase300,
    overflow: 'hidden',
  }),
  subtle: theme => ({
    ':hover': {
      background: theme.colorNeutralBackground1Hover,
    },
  }),
});

const useFocusStyles = makeStyles({
  base: createCustomFocusIndicatorStyle(theme => ({
    borderColor: 'transparent',
    outline: '2px solid transparent',
    boxShadow: `
      ${theme.shadow4},
      0 0 0 2px ${theme.colorStrokeFocus2}
    `,
    zIndex: 1,
  })),
});

/**
 * Styles for the root slot when verticalList=false
 */
const useHorizontalListStyles = makeStyles({
  root: theme => ({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '12px 12px 0 12px',
    ':after': {
      background: 'none',
      borderRadius: theme.borderRadiusMedium,
      boxSizing: 'border-box',
      content: '""',
      display: 'block',
      height: '2px',
      alignSelf: 'stretch',
      margin: '10px 0 0 0',
    },
    ':hover': {
      ':after': {
        background: theme.colorNeutralStroke1,
      },
    },
  }),
  selected: theme => ({
    ':after': {
      background: theme.colorBrandStroke1,
    },
    ':hover': {
      ':after': {
        background: theme.colorBrandStroke1,
      },
    },
  }),
  small: {
    padding: '6px 8px 0 8px',
    ':after': {
      margin: '4px 0 0 0',
    },
  },
});

/**
 * Styles for the root slot when verticalList=true
 */
const useVerticalListStyles = makeStyles({
  root: theme => ({
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    padding: '7px 0 7px 9px',
    justifyContent: 'flex-start',
    ':before': {
      background: 'none',
      borderRadius: theme.borderRadiusMedium,
      boxSizing: 'border-box',
      content: '""',
      display: 'block',
      width: '2px',
      alignSelf: 'stretch',
      margin: '0 10px 0 0',
    },
    ':hover': {
      ':before': {
        background: theme.colorNeutralStroke1,
      },
    },
  }),
  selected: theme => ({
    ':before': {
      background: theme.colorBrandStroke1,
    },
    ':hover': {
      ':before': {
        background: theme.colorBrandStroke1,
      },
    },
  }),
  small: {
    padding: '3px 3px 0 5px',
    ':after': {
      margin: '0 4px 0 0',
    },
  },
});

const useContentStyles = makeStyles({
  base: {
    alignItems: 'center',
    background: 'none',
    border: 'none',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'flex-start',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  verticalList: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  verticalContent: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const useIconStyles = makeStyles({
  base: {
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
  },
  small: {
    fontSize: '20px',
    height: '20px',
    width: '20px',
  },
  medium: {
    fontSize: '20px',
    height: '20px',
    width: '20px',
  },
});

const useHorizontalContentIconStyles = makeStyles({
  small: {
    marginRight: '2px',
  },
  medium: {
    marginRight: '6px',
  },

  mediumVerticalContent: {
    marginRight: '0',
    marginBottom: '4px',
  },
  smallVerticalContent: {
    marginRight: '0',
    marginBottom: '2px',
  },
});

const useVerticalContentIconStyles = makeStyles({
  small: {
    marginRight: '0',
    marginBottom: '2px',
  },
  medium: {
    marginRight: '0',
    marginBottom: '4px',
  },
});

/**
 * Apply styling to the Tab slots based on the state
 */
export const useTabStyles = (state: TabState): TabState => {
  const styles = useStyles();
  const focusStyles = useFocusStyles();
  const horizontalListStyles = useHorizontalListStyles();
  const verticalListStyles = useVerticalListStyles();

  const contentStyles = useContentStyles();
  const iconStyles = useIconStyles();
  const horizontalContentIconStyles = useHorizontalContentIconStyles();
  const verticalContentIconStyles = useVerticalContentIconStyles();

  state.root.className = mergeClasses(
    tabClassName,
    styles.root,
    focusStyles.base,
    state.appearance === 'subtle' && styles.subtle,
    state.verticalList ? verticalListStyles.root : horizontalListStyles.root,
    state.size === 'small' && (state.verticalList ? verticalListStyles.small : horizontalListStyles.small),
    state.selected && (state.verticalList ? verticalListStyles.selected : horizontalListStyles.selected),
    state.root.className,
  );

  state.content.className = mergeClasses(
    contentClassName,
    contentStyles.base,
    state.verticalList && contentStyles.verticalList,
    state.verticalContent && contentStyles.verticalContent,
    state.content.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      iconStyles.base,
      iconStyles[state.size],
      state.verticalContent ? verticalContentIconStyles[state.size] : horizontalContentIconStyles[state.size],
      state.icon.className,
    );
  }

  return state;
};
