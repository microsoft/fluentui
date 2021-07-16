import * as React from 'react';
import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { Title2Props } from './Title2.types';
import { renderText, useText, useTextStyles } from '../Text/index';
import { typographyStyles } from '../../index';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.title2,
});

/**
 * Text wrapper component for the Title 2 typography variant
 */
export const Title2 = React.forwardRef<HTMLElement, Title2Props>((props, ref) => {
  const styles = useStyles();
  const state = useText(props, ref);
  useTextStyles(state);

  state.className = mergeClasses(state.className, styles.root, props.className);

  return renderText(state);
});

Title2.displayName = 'Title2';
