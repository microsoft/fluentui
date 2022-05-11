import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { createWrapper, TextWrapperProps } from '../wrapper';
import { SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots } from '../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

/**
 * @deprecated Use `subtitle1ClassNames.root` instead.
 */
export const subtitle1ClassName = 'fui-Subtitle1';
export const subtitle1ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Subtitle1',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.subtitle1,
});

/**
 * Text wrapper component for the Subtitle1 typography variant
 */
export const Subtitle1: FunctionComponent<TextWrapperProps> = createWrapper({
  useStyles,
  className: subtitle1ClassNames.root,
  displayName: 'Subtitle1',
});
