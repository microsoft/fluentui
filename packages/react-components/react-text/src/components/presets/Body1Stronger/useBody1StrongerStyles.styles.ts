import { makeStyles } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const body1StrongerClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Body1Stronger',
};

/**
 * Styles for the root slot
 */
export const useBody1StrongerStyles = makeStyles({
  root: typographyStyles.body1Stronger,
});
