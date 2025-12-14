import { makeStyles, mergeClasses } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots, TextState } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const subtitle2StrongerClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Subtitle2Stronger',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.subtitle2Stronger,
});

export const useSubtitle2StrongerStyles = (state: TextState): TextState => {
  const styles = useStyles();

  state.root.className = mergeClasses(subtitle2StrongerClassNames.root, styles.root, state.root.className);

  return state;
};
