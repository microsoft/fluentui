import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { createPreset } from '../createPreset';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots, TextPresetProps } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const caption1StrongClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Caption1Strong',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.caption1Strong,
});

/**
 * Text preset component for the Caption1Strong typography variant
 */
export const Caption1Strong: FunctionComponent<TextPresetProps> = createPreset({
  useStyles,
  className: caption1StrongClassNames.root,
  displayName: 'Caption1Strong',
});
