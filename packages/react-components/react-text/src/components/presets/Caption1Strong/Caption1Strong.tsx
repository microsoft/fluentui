import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { createPreset, TextWrapperProps } from '../createPreset';
import { SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots } from '../../Text/Text.types';
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
 * Text wrapper component for the Caption1Strong typography variant
 */
export const Caption1Strong: FunctionComponent<TextWrapperProps> = createPreset({
  useStyles,
  className: caption1StrongClassNames.root,
  displayName: 'Caption1Strong',
});
