import { makeStyles, mergeClasses } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots, TextState } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const subtitle1ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Subtitle1',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.subtitle1,
});

export const useSubtitle1Styles = (state: TextState): TextState => {
  const styles = useStyles();

  state.root.className = mergeClasses(subtitle1ClassNames.root, styles.root, state.root.className);

  return state;
};
