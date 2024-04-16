import { makeStyles } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const body1ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Body1',
};

/**
 * Styles for the root slot
 */
export const useBody1Styles = makeStyles({
  root: typographyStyles.body1,
});
