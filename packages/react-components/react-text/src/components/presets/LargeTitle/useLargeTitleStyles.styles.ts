import { makeStyles } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const largeTitleClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-LargeTitle',
};

/**
 * Styles for the root slot
 */
export const useLargeTitleStyles = makeStyles({
  root: typographyStyles.largeTitle,
});
