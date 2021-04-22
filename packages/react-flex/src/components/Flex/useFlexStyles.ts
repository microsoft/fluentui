import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { FlexState } from './Flex.types';

const useStyles = makeStyles({
  root: {
    '--gap': 0,
    '--grow': 0,
    '--shrink': 1,
    '> *': {
      order: 0,
      margin: 'var(--gap)',
      flexGrow: 'var(--grow)',
      flexShrink: 'var(--shrink)',
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

    ['--grow' as string]: state.grow === undefined ? 0 : state.grow,
    ['--shrink' as string]: state.shrink === undefined ? 1 : state.shrink,
    ['--gap' as string]: state.gap === undefined ? 0 : state.gap,
  };

  return state;
};
