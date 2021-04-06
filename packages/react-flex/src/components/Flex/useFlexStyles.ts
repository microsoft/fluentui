import { makeStyles, useAx } from '@fluentui/react-make-styles';
import { FlexState } from './Flex.types';

const useStyles = makeStyles({
  // TODO: Add default styles
  root: {},
  // TODO: Add styles conditioned on FlexState props, for example:
  // TODO: Add styles for any other slots, for example:
});

/**
 * Apply styling to the Flex slots based on the state
 * {@docCategory Flex }
 */
export const useFlexStyles = (state: FlexState): FlexState => {
  const styles = useStyles();
  state.className = useAx(styles.root, state.className);

  // TODO: Hook up slot styles, for example:
  // const exampleSlotClassName = useExampleSlotStyles(state);
  // if (state.exampleSlot) {
  //   state.exampleSlot.className = useAx(exampleSlotClassName, state.exampleSlot.className);
  // }

  return state;
};
