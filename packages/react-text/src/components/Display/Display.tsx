import type { FunctionComponent } from 'react';
import { makeStyles } from '@fluentui/react-make-styles';
import { typographyStyles } from '../../typographyStyles/index';
import { createWrapper, TextWrapperProps } from '../wrapper';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.display,
});

/**
 * Text wrapper component for the Display typography variant
 */
export const Display: FunctionComponent<TextWrapperProps> = createWrapper({ useStyles, displayName: 'Display' });
