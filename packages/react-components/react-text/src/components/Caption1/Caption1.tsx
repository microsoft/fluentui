import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { createWrapper, TextWrapperProps } from '../wrapper';
import { SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots } from '../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const caption1ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Caption1',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.caption1,
});

/**
 * Text wrapper component for the Caption1 typography variant
 */
export const Caption1: FunctionComponent<TextWrapperProps> = createWrapper({
  useStyles,
  className: caption1ClassNames.root,
  displayName: 'Caption1',
});
