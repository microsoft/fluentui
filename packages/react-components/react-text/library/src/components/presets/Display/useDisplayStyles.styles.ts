import { makeStyles } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const displayClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Display',
};

/**
 * Styles for the root slot
 */
export const useDisplayStyles = makeStyles({
  root: typographyStyles.display,
});
