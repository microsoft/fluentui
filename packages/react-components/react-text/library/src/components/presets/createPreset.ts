'use client';

import * as React from 'react';
import { renderText_unstable, useText_unstable, useTextStyles_unstable } from '../Text';
import type { TextProps, TextPresetProps, TextState } from '../Text';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

export function createPreset(options: {
  displayName: string;
  useStyles: (state: TextState) => TextState;
}): React.FunctionComponent<TextPresetProps> {
  const { useStyles, displayName } = options;
  const Wrapper: ForwardRefComponent<TextPresetProps> = React.forwardRef((props, ref) => {
    'use no memo';

    const state = useText_unstable(props as TextProps, ref);

    useTextStyles_unstable(state);
    useStyles(state);

    return renderText_unstable(state);
  });
  Wrapper.displayName = displayName;

  return Wrapper;
}
