import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { createPreset, TextWrapperProps } from '../createPreset';
import { SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots } from '../../Text/Text.types';
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
 * Text wrapper component for the Body1Strong typography variant
 */
export const Body1Strong: FunctionComponent<TextWrapperProps> = createPreset({
  useStyles,
  className: body1StrongClassNames.root,
  displayName: 'Body1Strong',
});
