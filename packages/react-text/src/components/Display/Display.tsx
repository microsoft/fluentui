import * as React from 'react';
import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { Text } from '../Text/index';
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
  const className = mergeClasses(styles.root, props.className);

  return <Text {...props} ref={ref} className={className} />;
});

Display.displayName = 'Display';
