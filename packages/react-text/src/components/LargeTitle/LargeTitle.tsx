import type { FunctionComponent } from 'react';
import { makeStyles } from '@fluentui/react-make-styles';
import { typographyStyles } from '../../typographyStyles/index';
import { createWrapper, TextWrapperProps } from '../wrapper';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.largeTitle,
});

/**
 * Text wrapper component for the Large Title typography variant
 */
export const LargeTitle: FunctionComponent<TextWrapperProps> = createWrapper({
  useStyles,
  displayName: 'LargeTitle',
});
