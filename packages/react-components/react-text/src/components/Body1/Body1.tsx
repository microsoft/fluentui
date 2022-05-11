import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { createWrapper, TextWrapperProps } from '../wrapper';
import { SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots } from '../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

/**
 * @deprecated Use `body1ClassNames.root` instead.
 */
export const body1ClassName = 'fui-Body1';
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
export const Body1: FunctionComponent<TextWrapperProps> = createWrapper({
  useStyles,
  className: body1ClassNames.root,
  displayName: 'Body1',
});
