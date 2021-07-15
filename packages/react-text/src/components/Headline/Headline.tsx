import * as React from 'react';
import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { HeadlineProps } from './Headline.types';
import { renderText, useText, useTextStyles } from '../Text/index';
import { typographyStyles } from '../../index';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.headline,
});

/**
 * Text wrapper component for the Headline typography variant
 */
export const Headline = React.forwardRef<HTMLElement, HeadlineProps>((props, ref) => {
  const styles = useStyles();
  const state = useText(props, ref);
  useTextStyles(state);

  state.className = mergeClasses(state.className, styles.root, props.className);

  return renderText(state);
});

Headline.displayName = 'Headline';
