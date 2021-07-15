import * as React from 'react';
import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { Title1Props } from './Title1.types';
import { renderText, useText, useTextStyles } from '../Text/index';
import { typographyStyles } from '../../index';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.title1,
});

/**
 * Text wrapper component for the Title 1 typography variant
 */
export const Title1 = React.forwardRef<HTMLElement, Title1Props>((props, ref) => {
  const styles = useStyles();
  const state = useText(props, ref);
  useTextStyles(state);

  state.className = mergeClasses(state.className, styles.root, props.className);

  return renderText(state);
});

Title1.displayName = 'Title1';
