import { makeStyles } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const title2ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Title2',
};

/**
 * Styles for the root slot
 */
export const useTitle2Styles = makeStyles({
  root: typographyStyles.title2,
});
