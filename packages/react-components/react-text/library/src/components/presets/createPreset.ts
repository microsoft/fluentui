import * as React from 'react';
import { mergeClasses } from '@griffel/react';
import { renderText_unstable, useText_unstable, useTextStyles_unstable } from '../Text';
import type { TextProps, TextPresetProps } from '../Text';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

export function createPreset(options: {
  className: string;
  displayName: string;
  useStyles: () => Record<'root', string>;
}): React.FunctionComponent<TextPresetProps> {
  const { useStyles, className, displayName } = options;
  //TODO: migrate to fc to ensure v18 compatibility
  // eslint-disable-next-line deprecation/deprecation
  const Wrapper: ForwardRefComponent<TextPresetProps> = React.forwardRef((props, ref) => {
    'use no memo';

    const styles = useStyles();
    const state = useText_unstable(props as TextProps, ref);

    useTextStyles_unstable(state);

    state.root.className = mergeClasses(className, state.root.className, styles.root, props.className);

    return renderText_unstable(state);
  });
  Wrapper.displayName = displayName;

  return Wrapper;
}
