import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { typographyStyles } from '../../typographyStyles/index';
import { createWrapper, TextWrapperProps } from '../wrapper';

export const title2ClassName = 'fui-Title2';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.title2,
});

/**
 * Text wrapper component for the Title 2 typography variant
 */
export const Title2: FunctionComponent<TextWrapperProps> = createWrapper({
  useStyles,
  className: title2ClassName,
  displayName: 'Title2',
});
