import { makeStyles } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const body1StrongClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Body1Strong',
};

/**
 * Styles for the root slot
 */
export const useBody1StrongStyles = makeStyles({
  root: typographyStyles.body1Strong,
});
