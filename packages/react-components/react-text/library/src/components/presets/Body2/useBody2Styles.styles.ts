import { makeStyles, mergeClasses } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots, TextState } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const body2ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Body2',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.body2,
});

export const useBody2Styles = (state: TextState): TextState => {
  const styles = useStyles();

  state.root.className = mergeClasses(body2ClassNames.root, styles.root, state.root.className);

  return state;
};
