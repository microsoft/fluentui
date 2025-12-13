import { makeStyles, mergeClasses } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots, TextState } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const caption2StrongClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Caption2Strong',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.caption2Strong,
});

export const useCaption2StrongStyles = (state: TextState): TextState => {
  const styles = useStyles();

  state.root.className = mergeClasses(caption2StrongClassNames.root, styles.root, state.root.className);

  return state;
};
