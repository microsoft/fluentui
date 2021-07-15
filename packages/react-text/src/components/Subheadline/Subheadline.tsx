import * as React from 'react';
import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { SubheadlineProps } from './Subheadline.types';
import { renderText, useText, useTextStyles } from '../Text/index';
import { typographyStyles } from '../../index';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.subheadline,
});

/**
 * Text wrapper component for the Subheadline typography variant
 */
export const Subheadline = React.forwardRef<HTMLElement, SubheadlineProps>((props, ref) => {
  const styles = useStyles();
  const state = useText(props, ref);
  useTextStyles(state);

  state.className = mergeClasses(state.className, styles.root, props.className);

  return renderText(state);
});

Subheadline.displayName = 'Subheadline';
