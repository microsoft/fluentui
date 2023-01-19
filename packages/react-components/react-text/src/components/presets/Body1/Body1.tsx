import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { createPreset } from '../createPreset';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots, TextPresetProps } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const body1ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Body1',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.body1,
});

/**
 * Text preset component for the Body1 typography variant
 */
export const Body1: FunctionComponent<TextPresetProps> = createPreset({
  useStyles,
  className: body1ClassNames.root,
  displayName: 'Body1',
});
