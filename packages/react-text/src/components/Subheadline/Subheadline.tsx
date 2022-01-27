import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { typographyStyles } from '../../typographyStyles/index';
import { createWrapper, TextWrapperProps } from '../wrapper';

export const subheadlineClassName = 'fui-Subheadline';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.subheadline,
});

/**
 * Text wrapper component for the Subheadline typography variant
 */
export const Subheadline: FunctionComponent<TextWrapperProps> = createWrapper({
  useStyles,
  className: subheadlineClassName,
  displayName: 'Subheadline',
});
