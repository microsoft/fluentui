import * as React from 'react';
import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { Title3Props } from './Title3.types';
import { renderText, useText, useTextStyles } from '../Text/index';
import { typographyStyles } from '../../index';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.title3,
});

/**
 * Text wrapper component for the Title 3 typography variant
 */
export const Title3 = React.forwardRef<HTMLElement, Title3Props>((props, ref) => {
  const styles = useStyles();
  const state = useText(props, ref);
  useTextStyles(state);

  state.className = mergeClasses(state.className, styles.root, props.className);

  return renderText(state);
});

Title3.displayName = 'Title3';
