import type { FunctionComponent } from 'react';
import { makeStyles } from '@fluentui/react-make-styles';
import { typographyStyles } from '../../typographyStyles/index';
import { createWrapper, TextWrapperProps } from '../wrapper';

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
  displayName: 'Subheadline',
});
