import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { createPreset } from '../createPreset';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots, TextPresetProps } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const body2ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Body2',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.body2,
});

/**
 * Text preset component for the Body2 typography variant
 */
export const Body2: FunctionComponent<TextPresetProps> = createPreset({
  useStyles,
  className: body2ClassNames.root,
  displayName: 'Body2',
});
