import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { FlexState } from './Flex.types';

const cssVars = {
  gap: '--gap',
  grow: '--grow',
  shrink: '--shrink',
};

const useStyles = makeStyles({
  root: {
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
});

/**
 * Apply styling to the Flex slots based on the state
 * {@docCategory Flex }
 */
export const useFlexStyles = (state: FlexState): FlexState => {
  const styles = useStyles();
  state.className = mergeClasses(styles.root, state.className);

  const direction = state.direction ?? 'row';
  const horizontalAlign = state.horizontalAlign ?? 'normal';
  const verticalAlign = state.verticalAlign ?? 'normal';

  state.style = {
    ...state.style,
    display: state.inline ? 'inline-flex' : 'flex',
    flexDirection: direction,
    flexWrap: state.wrap ? 'wrap' : 'nowrap',
    justifyContent: direction.substring(0, 3) === 'row' ? horizontalAlign : verticalAlign,
    alignItems: direction.substring(0, 3) === 'row' ? verticalAlign : horizontalAlign,

    [cssVars.gap]: state.gap === undefined ? 0 : state.gap,
    [cssVars.grow]: state.grow === undefined ? 0 : state.grow,
    [cssVars.shrink]: state.shrink === undefined ? 1 : state.shrink,
  };

  return state;
};
