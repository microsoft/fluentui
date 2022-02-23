import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { typographyStyles } from '../../typographyStyles/index';
import { createWrapper, TextWrapperProps } from '../wrapper';

export const captionClassName = 'fui-Caption';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.caption,
});

/**
 * Text wrapper component for the Caption typography variant
 */
export const Caption: FunctionComponent<TextWrapperProps> = createWrapper({
  useStyles,
  className: captionClassName,
  displayName: 'Caption',
});
