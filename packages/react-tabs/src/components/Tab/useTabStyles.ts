import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import type { TabState } from './Tab.types';

export const tabClassName = 'fui-Tab';
const contentClassName = `${tabClassName}-content`;

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: theme => ({
    background: 'none',
    border: 'none',
    borderRadius: '4px',
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

const useHorizontalStyles = makeStyles({
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
});

const useVerticalStyles = makeStyles({
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
});

const useWrapperStyles = makeStyles({
  base: {
    alignItems: 'center',
    background: 'none',
    border: 'none',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
  },
  verticalContent: {
    flexDirection: 'column',
  },
});

/**
 * Apply styling to the Tab slots based on the state
 */
export const useTabStyles = (state: TabState): TabState => {
  const styles = useStyles();
  const horizontalStyles = useHorizontalStyles();
  const verticalStyles = useVerticalStyles();
  const wrapperStyles = useWrapperStyles();

  state.root.className = mergeClasses(
    tabClassName,
    styles.root,
    state.appearance === 'subtle' && styles.subtle,
    state.verticalList ? verticalStyles.root : horizontalStyles.root,
    state.selected && (state.verticalList ? verticalStyles.selected : horizontalStyles.selected),
    state.root.className,
  );

  state.contentClassName = mergeClasses(
    contentClassName,
    wrapperStyles.base,
    state.verticalContent && wrapperStyles.verticalContent,
  );

  return state;
};
