import { makeStyles, mergeClasses } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots, TextState } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const caption1StrongClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Caption1Strong',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.caption1Strong,
});

export const useCaption1StrongStyles = (state: TextState): TextState => {
  const styles = useStyles();

  state.root.className = mergeClasses(caption1StrongClassNames.root, styles.root, state.root.className);

  return state;
};
