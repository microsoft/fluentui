import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { createPreset, TextWrapperProps } from '../createPreset';
import { SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const caption2StrongClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Caption2Strong',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.caption2Strong,
});

/**
 * Text wrapper component for the Caption2Strong typography variant
 */
export const Caption2Strong: FunctionComponent<TextWrapperProps> = createPreset({
  useStyles,
  className: caption2StrongClassNames.root,
  displayName: 'Caption2Strong',
});
