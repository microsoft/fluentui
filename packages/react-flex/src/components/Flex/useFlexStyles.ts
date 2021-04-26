import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { FlexState } from './Flex.types';

const cssVars = {
  gap: '--gap',
  grow: '--grow',
  shrink: '--shrink',
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    [cssVars.gap]: 0,
    [cssVars.grow]: 0,
    [cssVars.shrink]: 1,
    '> *': {
      order: 0,
      margin: `var(${cssVars.gap})`,
      flexGrow: `var(${cssVars.grow})`,
      flexShrink: `var(${cssVars.shrink})`,
      flexBasis: 'auto',
      alignSelf: 'auto',
    },
  },

  flexDirectionRow: { flexDirection: 'row' },
  flexDirectionRowReverse: { flexDirection: 'row-reverse' },
  flexDirectionColumn: { flexDirection: 'column' },
  flexDirectionColumnReverse: { flexDirection: 'column-reverse' },

  justifyContentFlexStart: { justifyContent: 'flex-start' },
  justifyContentFlexEnd: { justifyContent: 'flex-end' },
  justifyContentCenter: { justifyContent: 'center' },
  justifyContentSpaceBetween: { justifyContent: 'space-between' },
  justifyContentSpaceAround: { justifyContent: 'space-around' },

  alignItemsFlexStart: { alignItems: 'flex-start' },
  alignItemsFlexEnd: { alignItems: 'flex-end' },
  alignItemsCenter: { alignItems: 'center' },
  alignItemsBaseline: { alignItems: 'baseline' },
  alignItemsStretch: { alignItems: 'stretch' },

  flexWrap: { flexWrap: 'wrap' },
  flexNoWrap: { flexWrap: 'nowrap' },

  displayInlineFlex: { display: 'inline-flex' },
  displayFlex: { display: 'flex' },
});

/**
 * Apply styling to the Flex slots based on the state
 * {@docCategory Flex }
 */
export const useFlexStyles = (state: FlexState): FlexState => {
  const styles = useStyles();

  const isRowDirection = state.direction?.substring(0, 3) === 'row';
  state.className = mergeClasses(
    styles.root,
    state.direction === 'row' && styles.flexDirectionRow,
    state.direction === 'column' && styles.flexDirectionColumn,
    state.direction === 'row-reverse' && styles.flexDirectionRowReverse,
    state.direction === 'column-reverse' && styles.flexDirectionColumnReverse,
    state.horizontalAlign === 'flex-start' &&
      (isRowDirection ? styles.justifyContentFlexStart : styles.alignItemsFlexStart),
    state.verticalAlign === 'flex-start' &&
      (isRowDirection ? styles.alignItemsFlexStart : styles.justifyContentFlexStart),
    state.horizontalAlign === 'flex-end' && (isRowDirection ? styles.justifyContentFlexEnd : styles.alignItemsFlexEnd),
    state.verticalAlign === 'flex-end' && (isRowDirection ? styles.alignItemsFlexEnd : styles.justifyContentFlexEnd),
    state.horizontalAlign === 'center' && (isRowDirection ? styles.justifyContentCenter : styles.alignItemsCenter),
    state.verticalAlign === 'center' && (isRowDirection ? styles.alignItemsCenter : styles.justifyContentCenter),
    state.horizontalAlign === 'space-around' && isRowDirection && styles.justifyContentSpaceAround,
    state.verticalAlign === 'space-around' && !isRowDirection && styles.justifyContentSpaceAround,
    state.horizontalAlign === 'space-between' && isRowDirection && styles.justifyContentSpaceBetween,
    state.verticalAlign === 'space-between' && !isRowDirection && styles.justifyContentSpaceBetween,
    state.horizontalAlign === 'stretch' && !isRowDirection && styles.alignItemsStretch,
    state.verticalAlign === 'stretch' && isRowDirection && styles.alignItemsStretch,
    state.horizontalAlign === 'baseline' && !isRowDirection && styles.alignItemsBaseline,
    state.verticalAlign === 'baseline' && isRowDirection && styles.alignItemsBaseline,
    state.wrap === true && styles.flexWrap,
    state.wrap === false && styles.flexNoWrap,
    state.inline === true && styles.displayInlineFlex,
    state.inline === false && styles.displayFlex,
    state.className,
  );

  state.style = {
    ...state.style,
    [cssVars.gap]: state.gap === undefined ? 0 : state.gap,
    [cssVars.grow]: state.grow === undefined ? 0 : state.grow,
    [cssVars.shrink]: state.shrink === undefined ? 1 : state.shrink,
  };

  return state;
};
