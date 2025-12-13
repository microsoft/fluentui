import { makeStyles, mergeClasses } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots, TextState } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const caption1ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Caption1',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.caption1,
});

export const useCaption1Styles = (state: TextState): TextState => {
  const styles = useStyles();

  state.root.className = mergeClasses(caption1ClassNames.root, styles.root, state.root.className);

  return state;
};
