import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import type { TabState } from './Tab.types';

export const tabClassName = 'fui-Tab';
const selectionIndicatorClassName = `${tabClassName}-selectionIndicator`;

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: theme => ({
    alignItems: 'center',
    background: 'none',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: theme.fontFamilyBase,
    fontSize: theme.fontSizeBase300,
    justifyContent: 'center',
    lineHeight: theme.lineHeightBase300,
    overflow: 'hidden',
    verticalAlign: 'middle',
    cursor: 'pointer',
    ':hover': {
      [`& .${selectionIndicatorClassName}`]: {
        background: theme.colorNeutralStroke1,
      },
    },
  }),
  selected: theme => ({
    [`& .${selectionIndicatorClassName}`]: {
      background: theme.colorBrandStroke1,
      margin: '0',
    },
    ':hover': {
      [`& .${selectionIndicatorClassName}`]: {
        background: theme.colorBrandStroke1,
        margin: '0',
      },
    },
  }),
});

const useSelectionIndicatorStyles = makeStyles({
  base: theme => ({
    background: 'none',
    borderRadius: theme.borderRadiusMedium,
    boxSizing: 'border-box',
    height: '2px',
    alignSelf: 'stretch',
    margin: '0 10px',
  }),
});

const useWrapperStyles = makeStyles({
  base: theme => ({
    alignItems: 'center',
    background: 'none',
    border: 'none',
    display: 'inline-flex',
    flexGrow: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    padding: '10px',
    textOverflow: 'ellipsis',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
  }),
});

/**
 * Apply styling to the Tab slots based on the state
 */
export const useTabStyles = (state: TabState): TabState => {
  const styles = useStyles();
  const selectionIndicatorStyles = useSelectionIndicatorStyles();
  const wrapperStyles = useWrapperStyles();

  state.root.className = mergeClasses(
    tabClassName,
    styles.root,
    state.selected && styles.selected,
    state.root.className,
  );

  state.selectionIndicator.className = mergeClasses(
    selectionIndicatorClassName,
    selectionIndicatorStyles.base,
    state.selectionIndicator.className,
  );

  state.wrapper.className = mergeClasses(wrapperStyles.base, state.wrapper.className);
  return state;
};
