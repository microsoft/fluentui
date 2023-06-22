import { makeStyles } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const title1ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Title1',
};

/**
 * Styles for the root slot
 */
export const useTitle1Styles = makeStyles({
  root: typographyStyles.title1,
});
