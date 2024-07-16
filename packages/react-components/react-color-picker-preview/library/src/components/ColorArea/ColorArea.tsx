import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useColorArea_unstable } from './useColorArea';
import { renderColorArea_unstable } from './renderColorArea';
import { useColorAreaStyles_unstable } from './useColorAreaStyles.styles';
import type { ColorAreaProps } from './ColorArea.types';

/**
 * ColorArea component - TODO: add more docs
 */
export const ColorArea: ForwardRefComponent<ColorAreaProps> = React.forwardRef((props, ref) => {
  const state = useColorArea_unstable(props, ref);

  useColorAreaStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  // useCustomStyleHook_unstable('useColorAreaStyles_unstable')(state);
  return renderColorArea_unstable(state);
});

ColorArea.displayName = 'ColorArea';
