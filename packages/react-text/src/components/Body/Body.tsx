import type { FunctionComponent } from 'react';
import { makeStyles } from '@fluentui/react-make-styles';
import { typographyStyles } from '../../typographyStyles/index';
import { createWrapper, TextWrapperProps } from '../wrapper';

export const bodyClassName = 'fui-Body';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.body,
});

/**
 * Text wrapper component for the Body typography variant
 */
export const Body: FunctionComponent<TextWrapperProps> = createWrapper({
  useStyles,
  className: bodyClassName,
  displayName: 'Body',
});
