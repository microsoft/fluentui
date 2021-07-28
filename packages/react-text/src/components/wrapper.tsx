import * as React from 'react';
import { mergeClasses } from '@fluentui/react-make-styles';
import { renderText, TextProps, useText, useTextStyles } from '../Text';

export interface Props extends Omit<TextProps, 'font' | 'size'> {}

export function createWrapper(options: { displayName: string; useStyles: () => Record<'root', string> }) {
  const { useStyles, displayName } = options;
  const Wrapper = React.forwardRef<HTMLElement, Props>((props, ref) => {
    const styles = useStyles();
    const state = useText(props, ref);
    useTextStyles(state);

    state.className = mergeClasses(state.className, styles.root, props.className);

    return renderText(state);
  });
  Wrapper.displayName = displayName;

  return Wrapper;
}
