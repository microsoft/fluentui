import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { createPreset } from '../createPreset';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots, TextPresetProps } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const body1StrongClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Body1Strong',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.body1Strong,
});

/**
 * Text preset component for the Body1Strong typography variant
 */
export const Body1Strong: FunctionComponent<TextPresetProps> = createPreset({
  useStyles,
  className: body1StrongClassNames.root,
  displayName: 'Body1Strong',
});
