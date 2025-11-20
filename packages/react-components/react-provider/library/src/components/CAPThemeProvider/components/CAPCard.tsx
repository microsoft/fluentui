import { makeStyles, mergeClasses } from '@griffel/react';
import { CardFooterState, CardHeaderState, CardState } from '@fluentui/react-components';
import { CAPTokens } from '../CAPTheme';

const useCAPCardStyles = makeStyles({
  root: {
    borderRadius: CAPTokens.cardCornerRadius,
  },
});

export function useCAPCardStylesHook(state: CardState) {
  const styles = useCAPCardStyles();
  state.root.className = mergeClasses(state.root.className, styles.root);
  return state;
}

const useCAPCardHeaderStyles = makeStyles({
  root: {},
});

export function useCAPCardHeaderStylesHook(state: CardHeaderState) {
  const styles = useCAPCardHeaderStyles();
  state.root.className = mergeClasses(state.root.className, styles.root);
  return state;
}

const useCAPCardFooterStyles = makeStyles({
  root: {},
});

export function useCAPCardFooterStylesHook(state: CardFooterState) {
  const styles = useCAPCardFooterStyles();
  state.root.className = mergeClasses(state.root.className, styles.root);
  return state;
}
