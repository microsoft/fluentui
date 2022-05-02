import * as React from 'react';
import { mergeClasses } from '@griffel/react';
import { renderText_unstable, useText_unstable, useTextStyles_unstable } from '../Text';
import type { TextProps } from '../Text';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

export type TextWrapperProps = Omit<TextProps, 'font' | 'size'>;

export function createWrapper(options: {
  className: string;
  displayName: string;
  useStyles: () => Record<'root', string>;
}): React.FunctionComponent<TextWrapperProps> {
  const { useStyles, className, displayName } = options;
  const Wrapper: ForwardRefComponent<TextWrapperProps> = React.forwardRef((props, ref) => {
    const styles = useStyles();
    const state = useText_unstable(props as TextProps, ref);

    useTextStyles_unstable(state);

    state.root.className = mergeClasses(className, state.root.className, styles.root, props.className);

    return renderText_unstable(state);
  });
  Wrapper.displayName = displayName;

  return Wrapper;
}
