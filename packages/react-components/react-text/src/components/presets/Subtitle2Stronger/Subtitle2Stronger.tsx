import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { createPreset, TextWrapperProps } from '../createPreset';
import { SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots } from '../../Text/Text.types';
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
 * Text wrapper component for the Subtitle2Stronger typography variant
 */
export const Subtitle2Stronger: FunctionComponent<TextWrapperProps> = createPreset({
  useStyles,
  className: subtitle2StrongerClassNames.root,
  displayName: 'Subtitle2Stronger',
});
