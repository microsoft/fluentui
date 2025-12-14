import { makeStyles, mergeClasses } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots, TextState } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const title3ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Title3',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.title3,
});

export const useTitle3Styles = (state: TextState): TextState => {
  const styles = useStyles();

  state.root.className = mergeClasses(title3ClassNames.root, styles.root, state.root.className);

  return state;
};
