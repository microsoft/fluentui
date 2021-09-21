import type { FunctionComponent } from 'react';
import { makeStyles } from '@fluentui/react-make-styles';
import { typographyStyles } from '../../typographyStyles/index';
import { createWrapper, TextWrapperProps } from '../wrapper';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.headline,
});

/**
 * Text wrapper component for the Headline typography variant
 */
export const Headline: FunctionComponent<TextWrapperProps> = createWrapper({
  useStyles,
  displayName: 'Headline',
});
