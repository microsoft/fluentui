import { makeStyles, mergeClasses } from '@griffel/react';
import { BadgeState } from '@fluentui/react-components';

const useCAPBadgeStyles = makeStyles({
  root: {},
});

export function useCAPBadgeStylesHook(state: BadgeState) {
  const styles = useCAPBadgeStyles();
  state.root.className = mergeClasses(state.root.className, styles.root);
  return state;
}
