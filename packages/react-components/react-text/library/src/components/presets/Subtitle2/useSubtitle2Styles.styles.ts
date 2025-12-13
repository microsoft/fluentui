import { makeStyles, mergeClasses } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots, TextState } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const subtitle2ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Subtitle2',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.subtitle2,
});

export const useSubtitle2Styles = (state: TextState): TextState => {
  const styles = useStyles();

  state.root.className = mergeClasses(subtitle2ClassNames.root, styles.root, state.root.className);

  return state;
};
