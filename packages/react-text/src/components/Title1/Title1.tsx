import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { typographyStyles } from '../../typographyStyles/index';
import { createWrapper, TextWrapperProps } from '../wrapper';

export const title1ClassName = 'fui-Title1';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.title1,
});

/**
 * Text wrapper component for the Title 1 typography variant
 */
export const Title1: FunctionComponent<TextWrapperProps> = createWrapper({
  useStyles,
  className: title1ClassName,
  displayName: 'Title1',
});
