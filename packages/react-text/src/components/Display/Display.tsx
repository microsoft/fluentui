import * as React from 'react';
import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { renderText, useText, useTextStyles } from '../Text/index';
import { typographyStyles } from '../../typographyStyles/index';
import { DisplayProps } from './Display.types';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.display,
});

/**
 * Text wrapper component for the Display typography variant
 */
export const Display = React.forwardRef<HTMLElement, DisplayProps>((props, ref) => {
  const styles = useStyles();
  const state = useText(props, ref);
  useTextStyles(state);

  state.className = mergeClasses(state.className, styles.root, props.className);

  return renderText(state);
});

Display.displayName = 'Display';
