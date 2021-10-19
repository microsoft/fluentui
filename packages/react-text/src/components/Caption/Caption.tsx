import type { FunctionComponent } from 'react';
import { makeStyles } from '@fluentui/react-make-styles';
import { typographyStyles } from '../../typographyStyles/index';
import { createWrapper, TextWrapperProps } from '../wrapper';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.caption,
});

/**
 * Text wrapper component for the Caption typography variant
 */
export const Caption: FunctionComponent<TextWrapperProps> = createWrapper({ useStyles, displayName: 'Caption' });
