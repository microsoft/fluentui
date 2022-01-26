import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { typographyStyles } from '../../typographyStyles/index';
import { createWrapper, TextWrapperProps } from '../wrapper';

export const headlineClassName = 'fui-Headline';

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
  className: headlineClassName,
  displayName: 'Headline',
});
