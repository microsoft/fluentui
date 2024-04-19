import { makeStyles } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const caption1StrongerClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Caption1Stronger',
};

/**
 * Styles for the root slot
 */
export const useCaption1StrongerStyles = makeStyles({
  root: typographyStyles.caption1Stronger,
});
