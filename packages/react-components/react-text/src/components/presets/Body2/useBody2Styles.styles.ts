import { makeStyles } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const body2ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Body2',
};

/**
 * Styles for the root slot
 */
export const useBody2Styles = makeStyles({
  root: typographyStyles.body2,
});
