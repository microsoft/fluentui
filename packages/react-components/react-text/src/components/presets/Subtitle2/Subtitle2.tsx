import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { createPreset } from '../createPreset';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots, TextPresetProps } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const subtitle2ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Subtitle2',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.subtitle2,
});

/**
 * Text preset component for the Subtitle2 typography variant
 */
export const Subtitle2: FunctionComponent<TextPresetProps> = createPreset({
  useStyles,
  className: subtitle2ClassNames.root,
  displayName: 'Subtitle2',
});
