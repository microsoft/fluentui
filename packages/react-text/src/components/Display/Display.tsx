import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { typographyStyles } from '../../typographyStyles/index';
import { createWrapper, TextWrapperProps } from '../wrapper';

export const displayClassName = 'fui-Display';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.display,
});

/**
 * Text wrapper component for the Display typography variant
 */
export const Display: FunctionComponent<TextWrapperProps> = createWrapper({
  useStyles,
  className: displayClassName,
  displayName: 'Display',
});
