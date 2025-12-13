import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots, TextState } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const body1StrongClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Body1Strong',
};

/**
 * Styles for the root slot
 */

const useStyles = makeStyles({
  root: typographyStyles.body1Strong,
});

export const useBody1StrongStyles = (state: TextState): TextState => {
  const styles = useStyles();

  state.root.className = mergeClasses(body1StrongClassNames.root, styles.root, state.root.className);

  return state;
};
