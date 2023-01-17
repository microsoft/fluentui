import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { createPreset, TextWrapperProps } from '../createPreset';
import { SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const caption1StrongerClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Caption1Stronger',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.caption1Stronger,
});

/**
 * Text wrapper component for the Caption1Stronger typography variant
 */
export const Caption1Stronger: FunctionComponent<TextWrapperProps> = createPreset({
  useStyles,
  className: caption1StrongerClassNames.root,
  displayName: 'Caption1Stronger',
});
