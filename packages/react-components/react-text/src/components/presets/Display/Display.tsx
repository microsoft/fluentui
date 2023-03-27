import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { createPreset } from '../createPreset';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots, TextPresetProps } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const displayClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Display',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.display,
});

/**
 * Text preset component for the Display typography variant
 */
export const Display: FunctionComponent<TextPresetProps> = createPreset({
  useStyles,
  className: displayClassNames.root,
  displayName: 'Display',
});
