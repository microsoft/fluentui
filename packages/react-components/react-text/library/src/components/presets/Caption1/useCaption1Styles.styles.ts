import { makeStyles } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const caption1ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Caption1',
};

/**
 * Styles for the root slot
 */
export const useCaption1Styles = makeStyles({
  root: typographyStyles.caption1,
});
