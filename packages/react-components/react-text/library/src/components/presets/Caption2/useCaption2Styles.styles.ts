import { makeStyles, mergeClasses } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots, TextState } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const caption2ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Caption2',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.caption2,
});

export const useCaption2Styles = (state: TextState): TextState => {
  const styles = useStyles();

  state.root.className = mergeClasses(caption2ClassNames.root, styles.root, state.root.className);

  return state;
};
