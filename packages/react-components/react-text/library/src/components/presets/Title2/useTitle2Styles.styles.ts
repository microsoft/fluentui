import { makeStyles, mergeClasses } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots, TextState } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const title2ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Title2',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.title2,
});

export const useTitle2Styles = (state: TextState): TextState => {
  const styles = useStyles();

  state.root.className = mergeClasses(title2ClassNames.root, styles.root, state.root.className);

  return state;
};
