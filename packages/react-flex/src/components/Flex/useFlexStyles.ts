import { makeStyles, ax } from '@fluentui/react-make-styles';
import { FlexState } from './Flex.types';

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles<FlexState>([
  [
    null,
    theme => ({
      // TODO Add default styles
    }),
  ],
  // TODO Add styles conditioned on FlexState props, for example:
  // [
  //   s => s.exampleProp === 'exampleValue',
  //   theme => ({
  //
  //   }),
  // ],
]);

// TODO Add styles for any other slots, for example:
// const useExampleSlotStyles = makeStyles<FlexState>([
//   [
//     null,
//     theme => ({
//
//     }),
//   ],
// ]);

/**
 * Apply styling to the Flex slots based on the state
 * {@docCategory Flex }
 */
export const useFlexStyles = (state: FlexState): FlexState => {
  state.className = ax(useRootStyles(state), state.className);

  // TODO Hook up slot styles, for example:
  // const exampleSlotClassName = useExampleSlotStyles(state);
  // if (state.exampleSlot) {
  //   state.exampleSlot.className = ax(exampleSlotClassName, state.exampleSlot.className);
  // }

  return state;
};
