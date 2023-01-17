import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { createPreset, TextWrapperProps } from '../createPreset';
import { SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots } from '../../Text/Text.types';
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
 * Text wrapper component for the Body1 typography variant
 */
export const Body1: FunctionComponent<TextWrapperProps> = createPreset({
  useStyles,
  className: body1ClassNames.root,
  displayName: 'Body1',
});
