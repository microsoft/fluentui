import * as React from 'react';
import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { CaptionProps } from './Caption.types';
import { renderText, useText, useTextStyles } from '../Text/index';
import { typographyStyles } from '../../index';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.caption,
});

/**
 * Text wrapper component for the Caption typography variant
 */
export const Caption = React.forwardRef<HTMLElement, CaptionProps>((props, ref) => {
  const styles = useStyles();
  const state = useText(props, ref);
  useTextStyles(state);

  state.className = mergeClasses(state.className, styles.root, props.className);

  return renderText(state);
});

Caption.displayName = 'Caption';
