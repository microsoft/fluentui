import { makeStyles, mergeClasses } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots, TextState } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const caption1StrongerClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Caption1Stronger',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.caption1Stronger,
});

export const useCaption1StrongerStyles = (state: TextState): TextState => {
  const styles = useStyles();

  state.root.className = mergeClasses(caption1StrongerClassNames.root, styles.root, state.root.className);

  return state;
};
