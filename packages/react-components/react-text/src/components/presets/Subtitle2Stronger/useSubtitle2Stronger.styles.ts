import { makeStyles } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const subtitle2StrongerClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Subtitle2Stronger',
};

/**
 * Styles for the root slot
 */
export const useSubtitle2StrongerStyles = makeStyles({
  root: typographyStyles.subtitle2Stronger,
});
