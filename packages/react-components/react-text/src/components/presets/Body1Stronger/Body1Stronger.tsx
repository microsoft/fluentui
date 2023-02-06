import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { createPreset } from '../createPreset';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots, TextPresetProps } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const body1StrongerClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Body1Stronger',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.body1Stronger,
});

/**
 * Text preset component for the Body1Stronger typography variant
 */
export const Body1Stronger: FunctionComponent<TextPresetProps> = createPreset({
  useStyles,
  className: body1StrongerClassNames.root,
  displayName: 'Body1Stronger',
});
