import { makeStyles } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const title3ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Title3',
};

/**
 * Styles for the root slot
 */
export const useTitle3Styles = makeStyles({
  root: typographyStyles.title3,
});
