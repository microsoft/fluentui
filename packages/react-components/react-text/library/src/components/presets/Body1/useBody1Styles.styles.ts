import { makeStyles, mergeClasses } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots, TextState } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const body1ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Body1',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.body1,
});

export const useBody1Styles = (state: TextState): TextState => {
  const styles = useStyles();

  state.root.className = mergeClasses(body1ClassNames.root, styles.root, state.root.className);

  return state;
};
