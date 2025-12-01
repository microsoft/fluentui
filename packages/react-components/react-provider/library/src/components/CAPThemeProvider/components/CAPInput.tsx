import { makeStyles, mergeClasses } from '@griffel/react';
import { InputState } from '@fluentui/react-components';

const useCAPInputStyles = makeStyles({
  root: {},
});

export function useCAPInputStylesHook(state: InputState) {
  const styles = useCAPInputStyles();
  state.root.className = mergeClasses(state.root.className, styles.root);
  return state;
}
