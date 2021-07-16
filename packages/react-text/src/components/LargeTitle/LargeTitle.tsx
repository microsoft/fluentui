import * as React from 'react';
import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { renderText, useText, useTextStyles } from '../Text/index';
import { LargeTitleProps } from './LargeTitle.types';
import { typographyStyles } from '../../index';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.largeTitle,
});

/**
 * Text wrapper component for the Large Title typography variant
 */
export const LargeTitle = React.forwardRef<HTMLElement, LargeTitleProps>((props, ref) => {
  const styles = useStyles();
  const state = useText(props, ref);
  useTextStyles(state);

  state.className = mergeClasses(state.className, styles.root, props.className);

  return renderText(state);
});

LargeTitle.displayName = 'LargeTitle';
