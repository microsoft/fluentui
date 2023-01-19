import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { createPreset } from '../createPreset';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots, TextPresetProps } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const subtitle1ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Subtitle1',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.subtitle1,
});

/**
 * Text preset component for the Subtitle1 typography variant
 */
export const Subtitle1: FunctionComponent<TextPresetProps> = createPreset({
  useStyles,
  className: subtitle1ClassNames.root,
  displayName: 'Subtitle1',
});
