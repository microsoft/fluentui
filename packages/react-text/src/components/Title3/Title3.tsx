import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { typographyStyles } from '../../typographyStyles/index';
import { createWrapper, TextWrapperProps } from '../wrapper';

export const title3ClassName = 'fui-Title3';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.title3,
});

/**
 * Text wrapper component for the Title 3 typography variant
 */
export const Title3: FunctionComponent<TextWrapperProps> = createWrapper({
  useStyles,
  className: title3ClassName,
  displayName: 'Title3',
});
