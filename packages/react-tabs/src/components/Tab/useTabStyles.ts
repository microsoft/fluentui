import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import type { TabState } from './Tab.types';

export const tabClassName = 'fui-Tab';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: theme => ({
    alignItems: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: theme.fontFamilyBase,
    fontSize: theme.fontSizeBase300,
    justifyContent: 'center',
    lineHeight: theme.lineHeightBase300,
    overflow: 'hidden',
    padding: '12px 12px 0 12px',
    textOverflow: 'ellipsis',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
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

/**
 * Apply styling to the Tab slots based on the state
 */
export const useTabStyles = (state: TabState): TabState => {
  const styles = useStyles();

  state.root.className = mergeClasses(
    tabClassName,
    styles.root,
    state.selected && styles.selected,
    state.root.className,
  );

  return state;
};
