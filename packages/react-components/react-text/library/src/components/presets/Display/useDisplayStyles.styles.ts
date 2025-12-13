import { makeStyles, mergeClasses } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots, TextState } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const displayClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Display',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.display,
});

export const useDisplayStyles = (state: TextState): TextState => {
  const styles = useStyles();

  state.root.className = mergeClasses(displayClassNames.root, styles.root, state.root.className);

  return state;
};
