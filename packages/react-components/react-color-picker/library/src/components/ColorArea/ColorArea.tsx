import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useColorArea_unstable } from './useColorArea';
import { renderColorArea_unstable } from './renderColorArea';
import { useColorAreaStyles_unstable } from './useColorAreaStyles.styles';
import type { ColorAreaProps } from './ColorArea.types';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * ColorArea component
 */
export const ColorArea: ForwardRefComponent<ColorAreaProps> = React.forwardRef((props, ref) => {
  const state = useColorArea_unstable(props, ref);

  useColorAreaStyles_unstable(state);
  useCustomStyleHook_unstable('useColorAreaStyles_unstable')(state);

  return renderColorArea_unstable(state);
});

ColorArea.displayName = 'ColorArea';
