import { makeStyles } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const subtitle1ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Subtitle1',
};

/**
 * Styles for the root slot
 */
export const useSubtitle1Styles = makeStyles({
  root: typographyStyles.subtitle1,
});
