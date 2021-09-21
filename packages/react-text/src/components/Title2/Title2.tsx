import type { FunctionComponent } from 'react';
import { makeStyles } from '@fluentui/react-make-styles';
import { typographyStyles } from '../../typographyStyles/index';
import { createWrapper, TextWrapperProps } from '../wrapper';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.title2,
});

/**
 * Text wrapper component for the Title 2 typography variant
 */
export const Title2: FunctionComponent<TextWrapperProps> = createWrapper({ useStyles, displayName: 'Title2' });
