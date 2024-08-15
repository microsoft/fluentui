import { makeStyles } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const subtitle2ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Subtitle2',
};

/**
 * Styles for the root slot
 */
export const useSubtitle2Styles = makeStyles({
  root: typographyStyles.subtitle2,
});
