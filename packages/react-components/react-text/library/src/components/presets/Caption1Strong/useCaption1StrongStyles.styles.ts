import { makeStyles } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const caption1StrongClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Caption1Strong',
};

/**
 * Styles for the root slot
 */
export const useCaption1StrongStyles = makeStyles({
  root: typographyStyles.caption1Strong,
});
