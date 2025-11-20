import { makeStyles, mergeClasses } from '@griffel/react';
import { CardState } from '@fluentui/react-components';

const useCAPCardStyles = makeStyles({
  root: {},
});

export function useCAPCardStylesHook(state: CardState) {
  const styles = useCAPCardStyles();
  state.root.className = mergeClasses(state.root.className, styles.root);
  return state;
}
