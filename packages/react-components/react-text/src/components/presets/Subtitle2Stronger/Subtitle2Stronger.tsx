import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { createPreset } from '../createPreset';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots, TextPresetProps } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const subtitle2StrongerClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Subtitle2Stronger',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.subtitle2Stronger,
});

/**
 * Text preset component for the Subtitle2Stronger typography variant
 */
export const Subtitle2Stronger: FunctionComponent<TextPresetProps> = createPreset({
  useStyles,
  className: subtitle2StrongerClassNames.root,
  displayName: 'Subtitle2Stronger',
});
