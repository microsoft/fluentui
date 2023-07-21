import { makeStyles } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const caption2ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Caption2',
};

/**
 * Styles for the root slot
 */
export const useCaption2Styles = makeStyles({
  root: typographyStyles.caption2,
});
