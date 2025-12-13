import { makeStyles, mergeClasses } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots, TextState } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const body1StrongerClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Body1Stronger',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.body1Stronger,
});

export const useBody1StrongerStyles = (state: TextState): TextState => {
  const styles = useStyles();

  state.root.className = mergeClasses(body1StrongerClassNames.root, styles.root, state.root.className);

  return state;
};
